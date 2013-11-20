package haflow.engine.oozie;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;
import haflow.dto.profile.NodeConfiguration;
import haflow.engine.AbstractEngine;
import haflow.engine.Engine;
import haflow.engine.RunFlowResult;
import haflow.engine.ValidateFlowResult;
import haflow.engine.model.DirectedGraph;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.util.ModuleUtil;
import haflow.service.HdfsService;
import haflow.service.NodeConfigurationService;
import haflow.util.ClusterConfiguration;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Engine(name = "Oozie")
@Component
public class OozieEngine extends AbstractEngine {
	
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
			Map<UUID, Class<?>> moduleClasses = this.moduleUtil
					.searchForModuleClasses();
			
			messageBuilder.append("Start validating flow inputs and outputs ...");
			boolean isValidGraph = true;//validateGraph(graph, moduleClasses, messageBuilder);//TODO
			if (isValidGraph) {
				messageBuilder.append(" done"  + "<br>");
				
				messageBuilder.append("Start validating configurations of each node ..." + "<br>");
				boolean isValide = validateEachNode(flow, moduleClasses, messageBuilder);// TODO
				if (isValide) {
					messageBuilder.append(" done"  + "<br>");
					
					messageBuilder.append("Start generating Oozie xml ...");
					String flowName = flow.getName();
					String workflowXml = null;
					try {
						workflowXml = this.oozieFlowXmlGenerator.genWorkflowXml(flow, moduleClasses, messageBuilder);
					} catch (Exception e) {
						messageBuilder.append(e.getMessage());
					}
					if (workflowXml != null){
						messageBuilder.append(" done"  + "<br>");
						
						messageBuilder.append("Start deploying flow locally ...");
						String localDeployPath = this.clusterConfiguration
								.getProperty(ClusterConfiguration.WORKSPACE_LOCAL) + flowName;
						boolean deloyedLocally = this.flowDeployService
								.deployFlowLocal(localDeployPath, workflowXml, getJarPaths(flow.getNodes(), moduleClasses));
							if (deloyedLocally) {
							messageBuilder.append(" done"  + "<br>");
							
							String hdfsDeployPath = this.clusterConfiguration.
									getProperty(ClusterConfiguration.WORKSPACE_HDFS)+ flowName;
							boolean deleted = this.hdfsService.deleteDirectory(hdfsDeployPath);
							if (deleted) {
								messageBuilder.append( "<br>" + "Old folder deleted: " + hdfsDeployPath + "<br>");
							}

							messageBuilder.append("Start deploying flow to HDFS ...");
							boolean deployedToHdfs = this.hdfsService.uploadFile(
											localDeployPath,hdfsDeployPath);
							if (deployedToHdfs) {
								messageBuilder.append(" done"  + "<br>");
								
								messageBuilder.append("Start committing job to Oozie ...");

								String jobId = this.oozieService.runJob(flowName);
								if (jobId != null) {
									messageBuilder.append(" done"  + "<br>");
									
									messageBuilder
											.append("Job commited! Job id : " + jobId + "<br>");
									model.setCommitted(true);
									model.setJobId(jobId);
								} else {

									messageBuilder.append("Error :" + "Failed to commit job: "
											+ flowName + "<br>");
								}
							} else {
								messageBuilder
										.append("Error :" + flowName
												+ " failed to be uploaded to hdfs!" + "<br>");
							}
						}else {
							messageBuilder.append("Error :" + flowName
									+ " failed to be deployed locally!" + "<br>");
						} 
					}else  {
						messageBuilder
						.append("Error : Failed to generate Oozie xml!");
					} 
				}else {
					messageBuilder.append("Error : Invalid flow!");
				} 
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
			List<NodeConfiguration> nodeConfs = this.nodeConfigurationService.getNodeConfiguration(node.getId());
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
	
	@Autowired
	private void setOozieFlowXmlGenerator(
			OozieFlowXmlGenerator oozieFlowXmlGenerator) {
		this.oozieFlowXmlGenerator = oozieFlowXmlGenerator;
	}

	@Autowired
	private void setNodeConfigurationService(
			NodeConfigurationService nodeConfigurationService) {
		this.nodeConfigurationService = nodeConfigurationService;
	}

	@Autowired
	private void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}

	@Autowired
	private void setModuleUtil(ModuleUtil moduleUtil) {
		this.moduleUtil = moduleUtil;
	}

	@Autowired
	private void setHdfsService(HdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}

	@Autowired
	private void setOozieService(OozieService oozieService) {
		this.oozieService = oozieService;
	}

	@Autowired
	private void setFlowDeployService(FlowDeployService flowDeployService) {
		this.flowDeployService = flowDeployService;
	}

	private Logger logger = Logger.getLogger(this.getClass().getName());
	
	private ModuleUtil moduleUtil;
	private HdfsService hdfsService;
	private OozieService oozieService;
	private FlowDeployService flowDeployService;
	private NodeConfigurationService nodeConfigurationService;
	private ClusterConfiguration clusterConfiguration;
	private OozieFlowXmlGenerator oozieFlowXmlGenerator;
}
