package haflow.service;

import haflow.entity.Flow;
import haflow.entity.Node;
import haflow.flow.entity.Digraph;
import haflow.flow.entity.Topological;
import haflow.module.ModuleMetadata;
import haflow.module.basic.EndModule;
import haflow.module.basic.StartModule;
import haflow.module.general.JavaModule;
import haflow.profile.NodeConfigurationProfile;
import haflow.ui.model.RunFlowResultModel;
import haflow.utility.ModuleLoader;
import haflow.utility.SessionHelper;
import haflow.utility.XmlHelper;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

@Component
public class FlowExecuteService {

	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	private ModuleLoader moduleLoader;

	public ModuleLoader getModuleLoader() {
		return moduleLoader;
	}

	@Autowired
	public void setModuleLoader(ModuleLoader moduleLoader) {
		this.moduleLoader = moduleLoader;
	}

	private NodeConfigurationProfileService nodeConfigurationProfileService;

	public NodeConfigurationProfileService getNodeConfigurationProfileService() {
		return nodeConfigurationProfileService;
	}

	@Autowired
	public void setNodeConfigurationProfileService(
			NodeConfigurationProfileService nodeConfigurationProfileService) {
		this.nodeConfigurationProfileService = nodeConfigurationProfileService;
	}

	private XmlHelper xmlHelper;

	public XmlHelper getXmlHelper() {
		return xmlHelper;
	}

	@Autowired
	public void setXmlHelper(XmlHelper xmlHelper) {
		this.xmlHelper = xmlHelper;
	}

	private FlowDeployService flowDeployService;
	
	public FlowDeployService getFlowDeployService() {
		return flowDeployService;
	}
	
	@Autowired
	public void setFlowDeployService(FlowDeployService flowDeployService) {
		this.flowDeployService = flowDeployService;
	}

	public RunFlowResultModel runFlow(UUID flowId) {
		RunFlowResultModel model = new RunFlowResultModel();
		model.setFlowId(flowId);
		
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append("Running flow ...");
		
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow = (Flow) session.get(Flow.class, flowId);

		if (flow == null) {
			messageBuilder.append("Flow" + flowId + " not found!");
			model.setCommited(false);
			return model;
		}

		try {
			Map<String, Class<?>> moduleClasses = this.getModuleLoader()
					.searchForModuleClasses();
			Set<Node> nodes = flow.getNodes();
			List<Node> startNodes = new ArrayList<Node>();
			for (Node node : nodes) {
				Class<?> module = moduleClasses.get(node.getModuleId()
						.toString());
				if (module != null && module.equals(StartModule.class)) {
					startNodes.add(node);
				}
			}
			if (startNodes.size() != 1) {
				messageBuilder.append("Error: Wrong start node number " + startNodes.size());
			} else {
				// topological sorting
				// subgraph of start node
				Digraph graph = new Digraph(flow.getEdges(), flow.getNodes(),
						startNodes.get(0));
				Topological topo = new Topological(graph);
				List<Integer> sorted = topo.getOrder();
				StringBuilder sb = new StringBuilder();
				sb.append("<workflow-app xmlns=\"uri:oozie:workflow:0.2\" name=\""
						+ flow.getName() + "\">" + "\n");
				if (sorted != null) {			
					for (int i = 0; i < sorted.size(); i++) {//move end node to the end
						int w = sorted.get(i);
						Node node = graph.getNode(w);
						Class<?> moduleClass = moduleClasses.get(node.getModuleId()
								.toString());
						if(moduleClass.equals(EndModule.class)){//what if we have more than one end?
							for(int j = i+1; j < sorted.size(); j++){
								sorted.set(j-1, sorted.get(j));
							}
							sorted.set(sorted.size()-1, w);
							break;
						}
					}
					for (int i = 0; i < sorted.size(); i++) {
						int w = sorted.get(i);
						Node node = graph.getNode(w);
						Class<?> moduleClass = moduleClasses.get(node
								.getModuleId().toString());
						ModuleMetadata module = (ModuleMetadata) moduleClass
								.newInstance();
						Map<String, String> configurations = new HashMap<String, String>();
						configurations.put("name", node.getId().toString());
						List<NodeConfigurationProfile> ncps = this
								.getNodeConfigurationProfileService()
								.getNodeConfigurationProfile(node.getId());
						for (NodeConfigurationProfile ncp : ncps) {
							String key = ncp.getKey();
							String value = ncp.getValue();
							configurations.put(key, value);
						}
						
						List<Integer> adj = graph.getAdj(w);						
						for( int v : adj){
							if(sorted.contains(v)){
								configurations.put("ok", graph.getNode(v).getId().toString());
								break;//TODO
							}
						}
						Document doc = module.generate(configurations);
						String part = this.xmlHelper.getXmlString(doc);
						sb.append(part + "\n");
					}
				}else{
					messageBuilder.append("Error: Flow is has Circles!");
				}
//				sb.append("<kill name=\"fail\">" +
//						"<message>Work flow failed, " +
//						"error message[${wf:errorMessage(wf:lastErrorNode())}]</message>" +
//						"</kill>" + "\n");			
				sb.append("</workflow-app>" + "\n");
				System.out.println(sb.toString());
				messageBuilder.append("Generated xml : \n" + sb.toString());
				
				//deploy workflow
				String flowName = flow.getName();
				for (Node node : nodes) {
					Class<?> module = moduleClasses.get(node.getModuleId()
							.toString());
					String path = JavaModule.class.getProtectionDomain().getCodeSource().getLocation().getFile();
					if(path.endsWith(".jar")){
						File jarFile = new File(path);
						File dstPath = new File("D:/haflow/flows/" + flowName);
						System.out.println(path);
						this.flowDeployService.copyJarFile(jarFile, dstPath, jarFile.getName());
					}
				}
				
			}

			session.close();
			model.setMessage(messageBuilder.toString());
			model.setCommited(true);
			return model;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			model.setMessage(messageBuilder.toString());
			model.setCommited(false);
			return model;
		}
	}

	public static void main(String[] args) {
		FlowExecuteService flowExecuteService = new FlowExecuteService();
		flowExecuteService.runFlow(UUID
				.fromString("67f1811e-c2b3-4a32-b70a-32f486a0a947"));
	}
}
