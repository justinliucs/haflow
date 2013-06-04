package haflow.service;

import haflow.entity.Flow;
import haflow.entity.Node;
import haflow.flow.entity.Digraph;
import haflow.flow.entity.Topological;
import haflow.module.ModuleMetadata;
import haflow.module.basic.StartModule;
import haflow.profile.NodeConfigurationProfile;
import haflow.ui.helper.ModuleHelper;
import haflow.utility.SessionHelper;
import haflow.utility.XmlHelper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class FlowExecuteService {

	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}
	
	private ModuleHelper moduleHelper;

	public ModuleHelper getModuleHelper() {
		return moduleHelper;
	}

	@Autowired
	public void setModuleHelper(ModuleHelper moduleHelper) {
		this.moduleHelper = moduleHelper;
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

	public boolean runFlow(UUID flowId) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow = (Flow) session.get(Flow.class, flowId);
		Map<String, Class<?>> moduleClasses = this.moduleHelper.getModuleClasses();
		if (flow == null) {
			return false;
		}

		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document newDoc = db.newDocument();
			Element root = newDoc.createElement("workflow-app");
			root.setAttribute("xmlns", "uri:oozie:workflow:0.2");
			root.setAttribute("name", "java-main-wf");
			
			Set<Node> nodes = flow.getNodes();
			List<Node> startNodes = new ArrayList<Node>();
			for(Node node : nodes){
				if( moduleClasses.get(node.getModuleId()).equals(StartModule.class)){
					startNodes.add(node);
				}
			}
			if(startNodes.size() != 1){
				//Error: Wrong start node number
			}else{
				//topological sorting
				//subgraph of start node
				Digraph graph = new Digraph(flow.getEdges(), flow.getNodes(), startNodes.get(0));
				Topological topo = new Topological(graph);
				List<Integer> sorted = topo.getOrder();
				for( int i = 0; i < sorted.size(); i++ ){
					Node node = graph.getNode(sorted.get(i));
					Class<?> moduleClass = moduleClasses.get(node.getModuleId());
					ModuleMetadata module = (ModuleMetadata) moduleClass.newInstance();
					Map<String, String> configurations = new HashMap<String, String>();
					List<NodeConfigurationProfile> ncps = this.nodeConfigurationProfileService.getNodeConfigurationProfile(node.getId());
					for( NodeConfigurationProfile ncp : ncps){
						String key = ncp.getKey();
						String value = ncp.getValue();
						configurations.put(key, value);
					}
					Document doc = module.generate(configurations);
					root.appendChild(doc.getFirstChild());
//					nodeDocs.put(node.getId(), doc);
					this.xmlHelper.printDocument(doc);
				}
			}
			
			newDoc.appendChild(root);
			
			session.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return false;
		}
	}
	
	public static void main(String[] args) {
		FlowExecuteService flowExecuteService = new FlowExecuteService();
		flowExecuteService.runFlow(UUID.fromString("67f1811e-c2b3-4a32-b70a-32f486a0a947"));
	}
}
