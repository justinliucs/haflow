package haflow.engine.oozie;

import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;
import haflow.dto.profile.NodeConfiguration;
import haflow.engine.model.DirectedGraph;
import haflow.engine.model.TopologicalSort;
import haflow.module.AbstractHiveModule;
import haflow.module.AbstractJavaModule;
import haflow.module.Module;
import haflow.service.NodeConfigurationService;
import haflow.util.DocumentTransformer;
import haflow.util.OozieJobGlobalConfiguration;
import haflow.util.XmlFilter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

@Component
public class OozieFlowXmlGenerator {
	
	public String genWorkflowXml(Flow flow, DirectedGraph originalGraph, Map<UUID, Class<?>> moduleClasses, StringBuilder messageBuilder)
			throws Exception {
		messageBuilder.append("Start sorting nodes ...");
		
//		DirectedGraph originalGraph = new DirectedGraph(flow.getNodes(), flow.getEdges());
		Map<UUID, Map<String, String>> inputConfigurations = new HashMap<UUID, Map<String, String>>();
		DirectedGraph graph = this.graphTransformer.transform(flow, originalGraph, moduleClasses, inputConfigurations);
		List<Integer> sorted = new TopologicalSort(graph).getOrder();
		
		if( sorted == null){
			messageBuilder.append("Error: Flow has Circles!");
			throw new Exception("Sort Error !");
		}
		messageBuilder.append(" done"  + "<br>");
		
		StringBuilder workflowXml = new StringBuilder();
		String flowName = flow.getName();
		workflowXml.append("<workflow-app xmlns=\"uri:oozie:workflow:0.2\" name=\""
						+ flowName + "\">" + "\n");

//		this.replaceEndNode(sorted, moduleClasses, graph); //TODO change to generateEndNode
		
		//add start node
		Document startNodeXml = StartModuleGenerateHelper.generate(graph.getNode(sorted.get(0)).getName());
		workflowXml.append(DocumentTransformer.transfromFromDocumentToString(startNodeXml) + "\n");
		
		//generate kill & end node name
		Node killNode = NodeGenerateHelper.generateKillNode(flow);
		Node endNode = NodeGenerateHelper.generateEndNode(flow);
		
		
		for (int i = 0; i < sorted.size(); i++) {// generate xml
			int w = sorted.get(i);
			Node node = graph.getNode(w);
			Class<?> moduleClass = moduleClasses.get(node.getModuleId());
			Module moduleProtype = moduleClass.getAnnotation(Module.class);
			
			// global consistent configurations
			Map<String, String> configurations = new HashMap<String, String>();
			configurations.putAll(this.globalConfiguration.getProperties());			
			configurations.put("name", node.getName());

			// output configurations
			Map<String, Node> outputs = new HashMap<String, Node>();
			if( i < sorted.size()-1){
				outputs.put("ok", graph.getNode(sorted.get(i+1)));
			}else{
				outputs.put("ok", endNode);
			}
			outputs.put("error", killNode);

			// user specific configurations
			Map<String, String> userConfs = new HashMap<String, String>();
			List<NodeConfiguration> ncps = this.nodeConfigurationService
					.getNodeConfiguration(node.getId());
			for (NodeConfiguration ncp : ncps) {
				String key = ncp.getKey();
				String value = ncp.getValue();
				String xmlValue=XmlFilter.encodeXml(value);
				userConfs.put(key, xmlValue);
			}
			
			if( inputConfigurations.get(node.getId()) != null ){
				userConfs.putAll(inputConfigurations.get(node.getId()));
			}
			
			List<String> arguments = null;
			OozieNodeXmlGenerator gen = null;
			switch (moduleProtype.type()) {
			case SOURCE:
			case DEST:
				break;
			case MIDDLE_DATA:
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
				workflowXml.append(DocumentTransformer.transfromFromDocumentToString(doc) + "\n");// TODO
			}

		}
		
		//add kill & end nodes
		Document killDoc = KillModuleGenerateHelper.generate(killNode);
		workflowXml.append(DocumentTransformer.transfromFromDocumentToString(killDoc) + "\n");
		
		Document endDoc = EndModuleGenerateHelper.generate(endNode);
		workflowXml.append(DocumentTransformer.transfromFromDocumentToString(endDoc) + "\n");
		
		workflowXml.append("</workflow-app>" + "\n");
		return workflowXml.toString();
	}

	private NodeConfigurationService nodeConfigurationService;
	private OozieJobGlobalConfiguration globalConfiguration;
	private GraphTransformer graphTransformer;

	@Autowired
	private void setNodeConfigurationService(
			NodeConfigurationService nodeConfigurationService) {
		this.nodeConfigurationService = nodeConfigurationService;
	}

	@Autowired
	private void setGlobalConfiguration(OozieJobGlobalConfiguration globalConfiguration) {
		this.globalConfiguration = globalConfiguration;
	}

	@Autowired
	private void setGraphTransformer(GraphTransformer graphTransformer) {
		this.graphTransformer = graphTransformer;
	}
	
}
