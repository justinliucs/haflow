package haflow.engine.oozie;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;
import haflow.dto.profile.NodeConfiguration;
import haflow.engine.AbstractEngine;
import haflow.engine.Engine;
import haflow.engine.RunFlowResult;
import haflow.engine.ValidateFlowResult;
import haflow.engine.model.AdjMatrixNode;
import haflow.engine.model.DirectedGraph;
import haflow.engine.model.TopologicalSort;
import haflow.module.AbstractHiveModule;
import haflow.module.AbstractJavaModule;
import haflow.module.Module;
import haflow.module.basic.EndModule;
import haflow.module.basic.StartModule;
import haflow.module.util.ModuleLoader;
import haflow.service.HdfsService;
import haflow.service.NodeConfigurationService;
import haflow.util.ClusterConfiguration;
import haflow.util.GlobalConfiguration;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

@Engine(name = "Oozie")
@Component
public class OozieEngine extends AbstractEngine {

	private ModuleLoader moduleLoader;
	private NodeConfigurationService nodeConfigurationService;
	private ClusterConfiguration clusterConfiguration;
	private HdfsService hdfsService;
	private OozieService oozieService;
	private FlowDeployService flowDeployService;
	private GlobalConfiguration globalConfiguration;

	private ModuleLoader getModuleLoader() {
		return moduleLoader;
	}

	@Autowired
	private void setModuleLoader(ModuleLoader moduleLoader) {
		this.moduleLoader = moduleLoader;
	}

	private NodeConfigurationService getNodeConfigurationService() {
		return nodeConfigurationService;
	}

	@Autowired
	private void setNodeConfigurationService(
			NodeConfigurationService nodeConfigurationService) {
		this.nodeConfigurationService = nodeConfigurationService;
	}

	private ClusterConfiguration getClusterConfiguration() {
		return clusterConfiguration;
	}

	@Autowired
	private void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}

	private HdfsService getHdfsService() {
		return hdfsService;
	}

	@Autowired
	private void setHdfsService(HdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}

	private OozieService getOozieService() {
		return oozieService;
	}

	@Autowired
	private void setOozieService(OozieService oozieService) {
		this.oozieService = oozieService;
	}

	private FlowDeployService getFlowDeployService() {
		return flowDeployService;
	}

	@Autowired
	private void setFlowDeployService(FlowDeployService flowDeployService) {
		this.flowDeployService = flowDeployService;
	}

	public GlobalConfiguration getGlobalConfiguration() {
		return globalConfiguration;
	}

	@Autowired
	public void setGlobalConfiguration(GlobalConfiguration globalConfiguration) {
		this.globalConfiguration = globalConfiguration;
	}

	@Override
	public ValidateFlowResult validateFlow(Flow flow) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RunFlowResult runFlow(Flow flow) {
		UUID flowId = flow.getId();
		RunFlowResult model = new RunFlowResult();
		model.setFlowId(flowId);
		model.setCommitted(false);
		StringBuilder messageBuilder = new StringBuilder();

		try {
			Map<UUID, Class<?>> moduleClasses = this.getModuleLoader()
					.searchForModuleClasses();

			Set<Node> nodes = flow.getNodes();

			messageBuilder.append("Start parsing flow ..." + "\n");
			List<Node> startNodes = findStartNodes(nodes, moduleClasses);
			if (startNodes.size() != 1) {
				messageBuilder.append("Error: Wrong start node number "
						+ startNodes.size());
			} else {
				DirectedGraph graph = new DirectedGraph(flow.getNodes(),
						flow.getEdges(), startNodes.get(0));
				List<Integer> sorted = new TopologicalSort(graph).getOrder();

				if (sorted == null) {
					messageBuilder.append("Error: Flow is has Circles!");
				} else {
					String flowName = flow.getName();
					String workflowXml = genWorkflowXml(flowName, sorted,
							moduleClasses, graph);

					messageBuilder.append("Parsing flow ... Finised" + "\n");
					messageBuilder.append("Start deploying flow ..." + "\n");

					String localDeployPath = this.getClusterConfiguration()
							.getProperty(ClusterConfiguration.WORKSPACE_LOCAL)
							+ flowName;
					boolean deloyedLocally = this.getFlowDeployService()
							.deployFlowLocal(localDeployPath, workflowXml,
									getJarPaths(nodes, moduleClasses));
					// if (deloyedLocally) {
					// messageBuilder.append(flowName
					// + " has been deployed locally!" + "\n");
					//
					// String hdfsDeployPath = this.getClusterConfiguration()
					// .getProperty(
					// ClusterConfiguration.WORKSPACE_HDFS)
					// + flowName;
					// boolean deleted = this.getHdfsService()
					// .deleteDirectory(hdfsDeployPath);
					// if (deleted) {
					// messageBuilder.append("Old folder deleted: "
					// + hdfsDeployPath + "\n");
					// }
					//
					// boolean deployedToHdfs = this.getHdfsService()
					// .uploadFile(localDeployPath, hdfsDeployPath);
					// if (deployedToHdfs) {
					// messageBuilder.append(flowName
					// + " has been uploaded to hdfs!" + "\n");
					//
					// String jobId = this.getOozieService().runJob(
					// flowName);
					// if (jobId == null) {
					// messageBuilder.append("Failed to commit job: "
					// + flowName + "\n");
					// } else {
					// messageBuilder.append("Job commited! Job id : "
					// + jobId + "\n");
					// model.setCommitted(true);
					// model.setJobId(jobId);
					// }
					// } else {
					// messageBuilder.append(flowName
					// + " failed to be uploaded to hdfs!" + "\n");
					// }
					// } else {
					// messageBuilder.append(flowName
					// + " failed to be deployed locally!" + "\n");
					// }
				}
			}

			System.out.println(messageBuilder.toString());
			model.setMessage(messageBuilder.toString());
			System.out.println(messageBuilder.toString());
			return model;
		} catch (Exception e) {
			e.printStackTrace();
			model.setMessage(messageBuilder.toString());
			return model;
		}
	}

	private Set<String> getJarPaths(Set<Node> nodes,
			Map<UUID, Class<?>> moduleClasses) {
		Set<String> jarPaths = new HashSet<String>();
		for (Node node : nodes) {
			Class<?> module = moduleClasses.get(node.getModuleId());
			String path = module.getProtectionDomain().getCodeSource()
					.getLocation().getFile();
			jarPaths.add(path);
		}
		return jarPaths;
	}

	private List<Node> findStartNodes(Set<Node> nodes,
			Map<UUID, Class<?>> moduleClasses) {
		List<Node> startNodes = new ArrayList<Node>();
		for (Node node : nodes) {
			Class<?> module = moduleClasses.get(node.getModuleId());
			if (module != null && module.equals(StartModule.class)) {
				startNodes.add(node);
			}
		}
		return startNodes;
	}

	private void replaceEndNode(List<Integer> sorted,
			Map<UUID, Class<?>> moduleClasses, DirectedGraph graph) {
		for (int i = 0; i < sorted.size(); i++) {// move end node to the end
			int w = sorted.get(i);
			Node node = graph.getNode(w);
			Class<?> moduleClass = moduleClasses.get(node.getModuleId());
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
			Map<UUID, Class<?>> moduleClasses, DirectedGraph graph)
			throws InstantiationException, IllegalAccessException {
		StringBuilder workflowXml = new StringBuilder();
		workflowXml
				.append("<workflow-app xmlns=\"uri:oozie:workflow:0.2\" name=\""
						+ flowName + "\">" + "\n");

		this.replaceEndNode(sorted, moduleClasses, graph);

		for (int i = 0; i < sorted.size(); i++) {// generate xml
			int w = sorted.get(i);
			Node node = graph.getNode(w);

			Map<String, String> configurations = new HashMap<String, String>();

			// global consistent configurations
			configurations.putAll(this.globalConfiguration.getProperties());

			Class<?> moduleClass = moduleClasses.get(node.getModuleId());
			configurations.put("name", node.getName());

			Map<String, Node> outputs = new HashMap<String, Node>();
			List<AdjMatrixNode> adj = graph.getAdjacent(w);
			for (AdjMatrixNode v : adj) {
				if (sorted.contains(v.getIndex())) {
					Edge path = v.getPath();
					outputs.put(path.getSourceEndpoint(), // "ok"
							path.getTargetNode());
					System.out.println(path.getSourceEndpoint());
					System.out.println(path.getTargetNode().getName());
				}
			}

			// user specific configurations
			Map<String, String> userConfs = new HashMap<String, String>();
			List<NodeConfiguration> ncps = this.getNodeConfigurationService()
					.getNodeConfiguration(node.getId());
			for (NodeConfiguration ncp : ncps) {
				String key = ncp.getKey();
				String value = ncp.getValue();
				userConfs.put(key, value);
			}

			Module moduleProtype = moduleClass.getAnnotation(Module.class);

			OozieXmlGenerator gen = null;
			switch (moduleProtype.type()) {
			case START:
				gen = new StartModuleGenerator();
				break;
			case END:
				gen = new EndModuleGenerator();
				break;
			case KILL:
				gen = new KillModuleGenerator();
				break;
			case JAVA:
				AbstractJavaModule moduleInstance = (AbstractJavaModule) moduleClass
						.newInstance();
				configurations.put("main_class", moduleInstance.getMainClass());
				configurations.put("arg", moduleInstance.getArguments(userConfs));
				gen = new JavaModuleGenerator();
				break;
			case HIVE:
				AbstractHiveModule hiveModuleInstance = (AbstractHiveModule) moduleClass
						.newInstance();
				configurations.put("sql_file",
						hiveModuleInstance.getSQL(userConfs));
				gen = new HiveModuleGenerator();
				break;
			case DECISION:
			case FORK:
			case JOIN:
			case MAP_REDUCE:
			case PIG:
			case SUB_WORKFLOW:
			case FS:
			case OTHER:
			default:
				System.out.println("Unsupoorted Module Type!");
				break;
			}
			if (gen != null) {
				Document doc = gen.generate(configurations, null, outputs);
				TransformerFactory transFactory = TransformerFactory
						.newInstance();
				Transformer transformer;
				try {
					transformer = transFactory.newTransformer();
					transformer.setOutputProperty(
							OutputKeys.OMIT_XML_DECLARATION, "YES");
					DOMSource domSource = new DOMSource(doc);
					ByteArrayOutputStream bos = new ByteArrayOutputStream();
					transformer.transform(domSource, new StreamResult(bos));
					workflowXml.append(bos.toString());// TODO
				} catch (TransformerConfigurationException e) {
					e.printStackTrace();
				} catch (TransformerException e) {
					e.printStackTrace();
				}
			}

		}
		workflowXml.append("</workflow-app>" + "\n");
		return workflowXml.toString();
	}

}
