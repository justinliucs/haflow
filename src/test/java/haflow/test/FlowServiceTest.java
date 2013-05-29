package haflow.test;

import java.util.HashSet;
import java.util.UUID;

import haflow.service.FlowService;
import haflow.service.ModuleService;
import haflow.service.NodeAppearanceProfileService;
import haflow.ui.helper.FlowHelper;
import haflow.ui.model.EdgeModel;
import haflow.ui.model.MergeFlowModel;
import haflow.ui.model.NodeModel;
import haflow.ui.model.PositionModel;
import haflow.utility.SessionHelper;

import org.junit.Test;

public class FlowServiceTest {

	@Test
	public void test() {

		FlowHelper flowHelper = new FlowHelper();
		FlowService flowService = new FlowService();
		ModuleService moduleService = new ModuleService();
		NodeAppearanceProfileService nodeAppearanceProfileService = new NodeAppearanceProfileService();
		SessionHelper sessionHelper = new SessionHelper();
		flowHelper.setFlowService(flowService);
		flowHelper.setModuleService(moduleService);
		flowHelper
				.setNodeAppearanceProfileService(nodeAppearanceProfileService);
		flowService.setSessionHelper(sessionHelper);
		moduleService.setSessionHelper(sessionHelper);
		nodeAppearanceProfileService.setSessionHelper(sessionHelper);
		UUID flowId = UUID.randomUUID();
		UUID moduleId = moduleService.addModule("Test");

		NodeModel node1 = new NodeModel();
		node1.setFlowId(flowId);
		node1.setId(UUID.randomUUID());
		node1.setModuleId(moduleId);
		node1.setName("Node 1");
		node1.setPosition(new PositionModel());
		node1.getPosition().setLeft(100);
		node1.getPosition().setTop(100);

		NodeModel node2 = new NodeModel();
		node2.setFlowId(flowId);
		node2.setId(UUID.randomUUID());
		node2.setModuleId(moduleId);
		node2.setName("Node 2");
		node2.setPosition(new PositionModel());
		node2.getPosition().setLeft(200);
		node2.getPosition().setTop(200);

		EdgeModel edge = new EdgeModel();
		edge.setFlowId(flowId);
		edge.setId(UUID.randomUUID());
		edge.setSourceNodeId(node1.getId());
		edge.setTargetNodeId(node2.getId());

		MergeFlowModel model = new MergeFlowModel();
		model.setName("Test");
		model.setEdges(new HashSet<EdgeModel>());
		model.getEdges().add(edge);
		model.setNodes(new HashSet<NodeModel>());
		model.getNodes().add(node1);
		model.getNodes().add(node2);

		flowHelper.mergeFlow(flowId, model);

		// model.setEdges(new HashSet<EdgeModel>());
		// flowHelper.mergeFlow(flowId, model);
		// model.setNodes(new HashSet<NodeModel>());
		// model.getNodes().add(node1);
		// flowHelper.mergeFlow(flowId, model);
	}
}
