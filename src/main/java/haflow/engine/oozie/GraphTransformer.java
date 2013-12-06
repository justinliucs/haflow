package haflow.engine.oozie;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;
import haflow.dto.profile.NodeConfiguration;
import haflow.engine.model.AdjMatrixNode;
import haflow.engine.model.DirectedGraph;
import haflow.engine.model.TopologicalSort;
import haflow.module.Module;
import haflow.module.ModuleType;
import haflow.service.NodeConfigurationService;
import haflow.util.ClusterConfiguration;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GraphTransformer {
	public DirectedGraph transform(Flow flow, DirectedGraph graph, Map<UUID, Class<?>> moduleClasses, Map<UUID, Map<String, String>> nodeConfigurations){
		List<Integer> sorted = new TopologicalSort(graph).getOrder();
		Set<Node> newGraphNodes = new HashSet<Node>();
		Set<Edge> newGraphEdges = new HashSet<Edge>();
		
		for( int i = 0; i < graph.getNodeCount(); i++ ){
			int w = sorted.get(i);
			Node node = graph.getNode(w);
			Class<?> moduleClass = moduleClasses.get(node.getModuleId());
			Module moduleProtype = moduleClass.getAnnotation(Module.class);
			ModuleType moduleType = moduleProtype.type();
			
			Map<String, String> nodeConfiguration = nodeConfigurations.get(node.getId());
			if( nodeConfiguration == null){
				nodeConfiguration = new HashMap<String, String>();
				nodeConfigurations.put(node.getId(), nodeConfiguration);
			}
			
			List<NodeConfiguration> ncps = this.nodeConfigurationService
					.getNodeConfiguration(node.getId());			
			
			String oneInput = null;
			if( moduleType == ModuleType.MIDDLE_DATA){
				oneInput = nodeConfiguration.get(moduleProtype.inputs()[0].name()); 
			}
			//generate middle data paths
			//assert that data nodes are not in the middle of the flow
			List<AdjMatrixNode> adj = graph.getAdjacent(w);
			for (AdjMatrixNode v : adj) {
				if (sorted.contains(v.getIndex())) {
					Node target = v.getPath().getTargetNode();
					Map<String, String> inputConfiguration = nodeConfigurations.get(target.getId());
					if( inputConfiguration == null){
						inputConfiguration = new HashMap<String, String>();
						nodeConfigurations.put(target.getId(), inputConfiguration);
					}
					
					Class<?> targetModuleClass = moduleClasses.get(target.getModuleId());
					Module targetModuleProtype = targetModuleClass.getAnnotation(Module.class);
					ModuleType targetModuleType = targetModuleProtype.type();
					
					String prefix = this.clusterConfiguration.getProperty(ClusterConfiguration.MIDDLE_DATA_HDFS) 
							+ "/" + flow.getId().toString() + "_" + flow.getName();
					List<NodeConfiguration> destNcps = this.nodeConfigurationService
							.getNodeConfiguration(target.getId());
					
					v.genValue(prefix, moduleType, targetModuleType, ncps, destNcps, oneInput);
					nodeConfiguration.put(v.getPath().getSourceEndpoint(), v.getValue());//source end point
					inputConfiguration.put(v.getPath().getTargetEndpoint(), v.getValue());//target end point
					if( moduleType != ModuleType.SOURCE && moduleType != ModuleType.DEST ){
						if( targetModuleType != ModuleType.SOURCE && targetModuleType != ModuleType.DEST ){
							newGraphEdges.add(v.getPath());
						}
					}
				}
			}
			if( moduleType != ModuleType.SOURCE && moduleType != ModuleType.DEST ){
				newGraphNodes.add(node);
			}
		}
		
		return new DirectedGraph(newGraphNodes, newGraphEdges);
	}
	
	private ClusterConfiguration clusterConfiguration;
	private NodeConfigurationService nodeConfigurationService;
	
	@Autowired
	private void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}
	
	@Autowired
	private void setNodeConfigurationService(
			NodeConfigurationService nodeConfigurationService) {
		this.nodeConfigurationService = nodeConfigurationService;
	}
}
