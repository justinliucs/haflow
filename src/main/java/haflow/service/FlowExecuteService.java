package haflow.service;

import haflow.configuration.helper.ConfigurationHelper;
import haflow.entity.Flow;
import haflow.entity.Node;
import haflow.flow.entity.Digraph;
import haflow.flow.entity.Topological;
import haflow.hdfs.client.HdfsHelper;
import haflow.module.ModuleMetadata;
import haflow.module.basic.EndModule;
import haflow.module.basic.StartModule;
import haflow.oozie.client.OozieHelper;
import haflow.profile.NodeConfigurationProfile;
import haflow.ui.model.RunFlowResultModel;
import haflow.utility.ModuleLoader;
import haflow.utility.SessionHelper;
import haflow.utility.XmlHelper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
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

	private ConfigurationHelper clusterConfHelper;

	public ConfigurationHelper getClusterConfHelper() {
		return clusterConfHelper;
	}

	@Autowired
	public void setClusterConfHelper(ConfigurationHelper clusterConfHelper) {
		this.clusterConfHelper = clusterConfHelper;
	}
	
	private HdfsHelper hdfsHelper;

	public HdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}

	@Autowired
	public void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	private OozieHelper oozieHelper;

	public OozieHelper getOozieHelper() {
		return oozieHelper;
	}

	@Autowired
	public void setOozieHelper(OozieHelper oozieHelper) {
		this.oozieHelper = oozieHelper;
	}

	// private final String workspace_local = "D:/haflow/flows/";
	// private final String workspace_hdfs =
	// "hdfs://m150:9000/user/root/examples/apps/";

	public RunFlowResultModel runFlow(UUID flowId) {
		RunFlowResultModel model = new RunFlowResultModel();
		model.setFlowId(flowId);
		model.setCommited(false);
		StringBuilder messageBuilder = new StringBuilder();

		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow = (Flow) session.get(Flow.class, flowId);

		if (flow == null) {
			messageBuilder.append("Flow " + flowId + " not found!");
			model.setMessage(messageBuilder.toString());
			return model;
		}

		try {
			Map<String, Class<?>> moduleClasses = this.getModuleLoader()
					.searchForModuleClasses();

			Set<Node> nodes = flow.getNodes();

			messageBuilder.append("Start parsing flow ..." + "\n");
			List<Node> startNodes = findStartNodes(nodes, moduleClasses);
			if (startNodes.size() != 1) {
				messageBuilder.append("Error: Wrong start node number "
						+ startNodes.size());
			} else {
				Digraph graph = new Digraph(flow.getEdges(), flow.getNodes(),
						startNodes.get(0));
				List<Integer> sorted = new Topological(graph).getOrder();

				if (sorted == null) {
					messageBuilder.append("Error: Flow is has Circles!");
				} else {
					String flowName = flow.getName();
					String workflowXml = genWorkflowXml(flowName, sorted,
							moduleClasses, graph);

					messageBuilder.append("Parsing flow ... Finised" + "\n");
					messageBuilder.append("Start deploying flow ..." + "\n");

					String localDeployPath = this.clusterConfHelper
							.getProperty(ConfigurationHelper.WORKSPACE_LOCAL)
							+ flowName;
					boolean deloyedLocally = this.flowDeployService
							.deployFlowLocal(localDeployPath, workflowXml,
									getJarPaths(nodes, moduleClasses));
					if (deloyedLocally) {
						messageBuilder.append(flowName
								+ " has been deployed locally!" + "\n");

						String hdfsDeployPath = this.clusterConfHelper
								.getProperty(ConfigurationHelper.WORKSPACE_HDFS)
								+ flowName;
						boolean deleted = this.hdfsHelper
								.deleteFolder(hdfsDeployPath);
						if (deleted) {
							messageBuilder.append("Old folder deleted: "
									+ hdfsDeployPath + "\n");
						}

						boolean deployedToHdfs = this.hdfsHelper.putFile(
								localDeployPath, hdfsDeployPath);
						if (deployedToHdfs) {
							messageBuilder.append(flowName
									+ " has been uploaded to hdfs!" + "\n");

							String jobId = this.oozieHelper.runJob(flowName);
							if (jobId == null) {
								messageBuilder.append("Failed to commit job: "
										+ flowName + "\n");
							} else {
								messageBuilder.append("Job commited! Job id : "
										+ jobId + "\n");
								model.setCommited(true);
								model.setJobId(jobId);
							}
						} else {
							messageBuilder.append(flowName
									+ " failed to be uploaded to hdfs!" + "\n");
						}
					} else {
						messageBuilder.append(flowName
								+ " failed to be deployed locally!" + "\n");
					}
				}
			}

			System.out.println(messageBuilder.toString());
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			model.setMessage(messageBuilder.toString());
			return model;
		}

		model.setMessage(messageBuilder.toString());
		return model;
	}

	private Set<String> getJarPaths(Set<Node> nodes,
			Map<String, Class<?>> moduleClasses) {
		Set<String> jarPaths = new HashSet<String>();
		for (Node node : nodes) {
			Class<?> module = moduleClasses.get(node.getModuleId().toString());
			String path = module.getProtectionDomain().getCodeSource()
					.getLocation().getFile();
			jarPaths.add(path);
		}
		return jarPaths;
	}

	private List<Node> findStartNodes(Set<Node> nodes,
			Map<String, Class<?>> moduleClasses) {
		List<Node> startNodes = new ArrayList<Node>();
		for (Node node : nodes) {
			Class<?> module = moduleClasses.get(node.getModuleId().toString());
			if (module != null && module.equals(StartModule.class)) {
				startNodes.add(node);
			}
		}
		return startNodes;
	}

	private void replaceEndNode(List<Integer> sorted,
			Map<String, Class<?>> moduleClasses, Digraph graph) {
		for (int i = 0; i < sorted.size(); i++) {// move end node to the end
			int w = sorted.get(i);
			Node node = graph.getNode(w);
			Class<?> moduleClass = moduleClasses.get(node.getModuleId()
					.toString());
			if (moduleClass.equals(EndModule.class)) {// what if we have more
														// than one end?
				for (int j = i + 1; j < sorted.size(); j++) {
					sorted.set(j - 1, sorted.get(j));
				}
				sorted.set(sorted.size() - 1, w);
				break;
			}
		}
	}

	private String genWorkflowXml(String flowName, List<Integer> sorted,
			Map<String, Class<?>> moduleClasses, Digraph graph)
			throws InstantiationException, IllegalAccessException {
		StringBuilder workflowXml = new StringBuilder();
		workflowXml
				.append("<workflow-app xmlns=\"uri:oozie:workflow:0.2\" name=\""
						+ flowName + "\">" + "\n");

		this.replaceEndNode(sorted, moduleClasses, graph);

		for (int i = 0; i < sorted.size(); i++) {// generate xml
			if (i == sorted.size() - 1) {// inject kill node
				workflowXml
						.append("<kill name=\"fail\">"
								+ "<message>Work flow failed, "
								+ "error message[${wf:errorMessage(wf:lastErrorNode())}]</message>"
								+ "</kill>" + "\n");
			}
			int w = sorted.get(i);
			Node node = graph.getNode(w);
			Class<?> moduleClass = moduleClasses.get(node.getModuleId()
					.toString());
			ModuleMetadata module = (ModuleMetadata) moduleClass.newInstance();
			Map<String, String> configurations = new HashMap<String, String>();
			configurations.put("name", node.getName());
			List<NodeConfigurationProfile> ncps = this
					.getNodeConfigurationProfileService()
					.getNodeConfigurationProfile(node.getId());
			for (NodeConfigurationProfile ncp : ncps) {
				String key = ncp.getKey();
				String value = ncp.getValue();
				configurations.put(key, value);
			}

			List<Integer> adj = graph.getAdj(w);
			for (int v : adj) {
				if (sorted.contains(v)) {
					configurations.put("ok", graph.getNode(v).getName());
					break;// TODO
				}
			}
			Document doc = module.generate(configurations);
			String part = this.xmlHelper.getXmlString(doc);
			workflowXml.append(part + "\n");
		}
		workflowXml.append("</workflow-app>" + "\n");
		return workflowXml.toString();
	}

}
