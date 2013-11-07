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
import haflow.engine.model.GlobalConfiguration;
import haflow.engine.model.TopologicalSort;
import haflow.module.AbstractHiveModule;
import haflow.module.AbstractJavaModule;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.basic.EndModule;
import haflow.module.basic.StartModule;
import haflow.module.util.ModuleUtil;
import haflow.service.HdfsService;
import haflow.service.NodeConfigurationService;
import haflow.util.ClusterConfiguration;

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

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

@Engine(name = "Oozie")
@Component
public class OozieEngine extends AbstractEngine {

	private Logger logger = Logger.getLogger(this.getClass().getName());
	private ModuleUtil moduleUtil;
	private NodeConfigurationService nodeConfigurationService;
	private ClusterConfiguration clusterConfiguration;
	private HdfsService hdfsService;
	private OozieService oozieService;
	private FlowDeployService flowDeployService;
	private GlobalConfiguration globalConfiguration;

	private ModuleUtil getModuleUtil() {
		return moduleUtil;
	}

	@Autowired
	private void setModuleUtil(ModuleUtil moduleUtil) {
		this.moduleUtil = moduleUtil;
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
			Map<UUID, Class<?>> moduleClasses = this.getModuleUtil()
					.searchForModuleClasses();

			Set<Node> nodes = flow.getNodes();
			
			messageBuilder.append("Finding start node ...");
			List<Node> startNodes = findStartNodes(nodes, moduleClasses);
			if (startNodes.size() == 1) {
				messageBuilder.append(" done"  + "<br>");
				DirectedGraph graph = new DirectedGraph(flow.getNodes(),
						flow.getEdges(), startNodes.get(0));
				
				messageBuilder.append("Start validating flow inputs and outputs ...");
				boolean isValidGraph = validateGraph(graph, moduleClasses, messageBuilder);//TODO
				if (isValidGraph) {
					messageBuilder.append(" done"  + "<br>");
					
					messageBuilder.append("Start sorting nodes ...");
					List<Integer> sorted = new TopologicalSort(graph)
							.getOrder();

					if (sorted != null) {
						messageBuilder.append(" done"  + "<br>");
						
						messageBuilder.append("Start validating configurations of each node ..."
								+ "<br>");
						boolean isValide = validateEachNode(flow, moduleClasses, messageBuilder);// TODO
						if (isValide) {
							messageBuilder.append(" done"  + "<br>");
							
							messageBuilder.append("Start generating Oozie xml ...");
							String flowName = flow.getName();
							String workflowXml = null;
							try {
								workflowXml = genWorkflowXml(flowName, sorted,
										moduleClasses, graph);
							} catch (Exception e) {
								messageBuilder.append(e.getMessage());
							}

							if (workflowXml != null){
								messageBuilder.append(" done"  + "<br>");
								
								messageBuilder
										.append("Start deploying flow locally ...");
								String localDeployPath = this
										.getClusterConfiguration()
										.getProperty(
												ClusterConfiguration.WORKSPACE_LOCAL)
										+ flowName;
								boolean deloyedLocally = this
										.getFlowDeployService()
										.deployFlowLocal(
												localDeployPath,
												workflowXml,
												getJarPaths(nodes,
														moduleClasses));
								if (deloyedLocally) {
									messageBuilder.append(" done"  + "<br>");
									
									String hdfsDeployPath = this
											.getClusterConfiguration()
											.getProperty(
													ClusterConfiguration.WORKSPACE_HDFS)
											+ flowName;
									boolean deleted = this.getHdfsService()
											.deleteDirectory(hdfsDeployPath);
									if (deleted) {
										messageBuilder
												.append( "<br>" + "Old folder deleted: "
														+ hdfsDeployPath
														+ "<br>");
									}

									messageBuilder
											.append("Start deploying flow to HDFS ...");
									boolean deployedToHdfs = this
											.getHdfsService().uploadFile(
													localDeployPath,
													hdfsDeployPath);
									if (deployedToHdfs) {
										messageBuilder.append(" done"  + "<br>");
										
										messageBuilder
												.append("Start committing job to Oozie ...");

										String jobId = this.getOozieService()
												.runJob(flowName);
										if (jobId != null) {
											messageBuilder.append(" done"  + "<br>");
											
											messageBuilder
													.append("Job commited! Job id : "
															+ jobId + "<br>");
											model.setCommitted(true);
											model.setJobId(jobId);
										} else {

											messageBuilder
													.append("Error :" + "Failed to commit job: "
															+ flowName + "<br>");
										}
									} else {
										messageBuilder
												.append("Error :" + flowName
														+ " failed to be uploaded to hdfs!"
														+ "<br>");
									}
								}else {
									messageBuilder.append("Error :" + flowName
											+ " failed to be deployed locally!"
											+ "<br>");
								} 
							}else  {
								messageBuilder
								.append("Error : Failed to generate Oozie xml!");
							} 
						}else {
							messageBuilder.append("Error : Invalid flow!");
						} 
					}else {
						messageBuilder.append("Error: Flow has Circles!");
					} 
				}
			} else {
				messageBuilder.append("Error: Wrong start node number "
						+ startNodes.size());
			}

			model.setMessage(messageBuilder.toString());
			logger.info(messageBuilder.toString());
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

	private boolean validateGraph(DirectedGraph graph,
			Map<UUID, Class<?>> moduleClasses, StringBuilder messageBuilder) {
		List<Edge> edges = graph.getEdgeList();

		for (int i = 0; i < graph.getNodeCount(); i++) {
			Node node = graph.getNode(i);
			UUID moduleId = node.getModuleId();
			Class<?> moduleClass = moduleClasses.get(moduleId);
			Module annotation = moduleClass.getAnnotation(Module.class);
			ModuleEndpoint[] inputs = annotation.inputs();
			ModuleEndpoint[] outputs = annotation.outputs();

			for (ModuleEndpoint input : inputs) {
				String inputName = input.name();
				boolean found = false;
				for (Edge edge : edges) {
					if (edge.getTargetNode().getId().equals(node.getId())
							&& inputName.equals(edge.getTargetEndpoint())){
						found = true;
						break;
					}
				}				
				if( !found){
					messageBuilder.append("Empty input of node " + node.getName() + " input " + inputName);
					return false;
				}
			}
			
			for(ModuleEndpoint output : outputs){
				String outputName = output.name();
				boolean found = false;
				for( Edge edge : edges) {
					if( edge.getSourceNode().getId().equals(node.getId()) 
							&& outputName.equals(edge.getSourceEndpoint())){
						found = true;
						break;
					}
				}
				if ( !found){
					messageBuilder.append("Empty output of node " + node.getName() + " output " + outputName + "<br>");
					return false;
				}
			}
		}
		return true;// TODO
	}
	
	/**
	 * Check if each node of the flow has all the required configurations.
	 * @param flow
	 * @param moduleClasses
	 * @param messageBuilder
	 * @return
	 */
	private boolean validateEachNode(Flow flow, Map<UUID, Class<?>> 
		moduleClasses, StringBuilder messageBuilder){
		Set<Node> nodes = flow.getNodes();
		for( Node node : nodes){
			Class<?> moduleClass = moduleClasses.get(node.getModuleId());
			Module anno = moduleClass.getAnnotation(Module.class);
			ModuleConfiguration[] moduleConfs = anno.configurations();
			List<NodeConfiguration> nodeConfs = this.getNodeConfigurationService().getNodeConfiguration(node.getId());
			for(ModuleConfiguration moduleConf : moduleConfs){
				if( moduleConf.required()){
					boolean found = false;
					for( NodeConfiguration nodeConf : nodeConfs){
						if( nodeConf.getKey().equals(moduleConf.key()) && nodeConf.getValue() != null & nodeConf.getValue().trim() != ""){
							found = true;
							break;
						}
					}
					if( !found){
						messageBuilder.append("No value for " + moduleConf.key() + " of node " + node.getName() + "<br>");
						return false;
					}
				}
			}
		}
		return true;
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
					System.out.println(path.getSourceEndpoint() 
							+ " to " + path.getTargetNode().getName());
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
			List<String> arguments = null;
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
				arguments = moduleInstance.getArguments(userConfs);
				gen = new JavaModuleGenerator();
				break;
			case HIVE:
				AbstractHiveModule hiveModuleInstance = (AbstractHiveModule) moduleClass
						.newInstance();
				configurations.put("sql_file",
						hiveModuleInstance.getSQL(userConfs));
				configurations.put("outpath", hiveModuleInstance.getOutPath(userConfs));
				configurations.put("main_class", hiveModuleInstance.getMainClass());
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
				Document doc = gen.generate(configurations, null, outputs, arguments);
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
