package haflow.ui.controller;

import haflow.ui.model.AddFlowModel;
import haflow.ui.model.EdgeModel;
import haflow.ui.model.FlowBriefModel;
import haflow.ui.model.FlowListModel;
import haflow.ui.model.FlowModel;
import haflow.ui.model.ModifyFlowModel;
import haflow.ui.model.NodeModel;
import haflow.ui.model.PositionModel;
import haflow.ui.model.ResultModel;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/flow")
public class FlowController {

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public FlowListModel get() {
		List<FlowBriefModel> ret = new ArrayList<FlowBriefModel>();
		FlowBriefModel flow1 = new FlowBriefModel();
		flow1.setId(UUID.randomUUID());
		flow1.setName("Flow 1");
		ret.add(flow1);
		FlowListModel list = new FlowListModel();
		list.setFlows(ret);
		return list;
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.GET)
	@ResponseBody
	public FlowModel get(@PathVariable UUID flowId) {
		FlowModel flow1 = new FlowModel();
		flow1.setId(UUID.randomUUID());
		flow1.setName("Flow 1");
		flow1.setNodes(new ArrayList<NodeModel>());
		flow1.setEdges(new ArrayList<EdgeModel>());
		NodeModel node1 = new NodeModel();
		node1.setComponentId(UUID
				.fromString("2f30e2a9-6d97-0d2f-4a10-a3250812ab8e"));
		node1.setFlowId(flow1.getId());
		node1.setId(UUID.randomUUID());
		node1.setName("Node 1");
		PositionModel position1 = new PositionModel();
		position1.setLeft(100);
		position1.setTop(100);
		node1.setPosition(position1);
		flow1.getNodes().add(node1);
		NodeModel node2 = new NodeModel();
		node2.setComponentId(UUID
				.fromString("2f30e2a9-6d97-0d2f-4a10-a3250812ab8e"));
		node2.setFlowId(flow1.getId());
		node2.setId(UUID.randomUUID());
		node2.setName("Node 2");
		PositionModel position2 = new PositionModel();
		position2.setLeft(200);
		position2.setTop(200);
		node2.setPosition(position2);
		flow1.getNodes().add(node2);
		EdgeModel edge1 = new EdgeModel();
		edge1.setFlowId(flow1.getId());
		edge1.setId(UUID.randomUUID());
		edge1.setSourceNodeId(node1.getId());
		edge1.setTargetNodeId(node2.getId());
		flow1.getEdges().add(edge1);
		return flow1;
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResultModel post(@RequestBody AddFlowModel model) {
		System.out.println("delete");
		ResultModel ret = new ResultModel();
		ret.setSuccess(true);
		return ret;
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.PUT)
	@ResponseBody
	public ResultModel put(@PathVariable UUID flowId,
			@RequestBody ModifyFlowModel model) {
		ResultModel ret = new ResultModel();
		ret.setSuccess(true);
		return ret;
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResultModel delete(@PathVariable UUID flowId) {
		System.out.println("delete");
		ResultModel ret = new ResultModel();
		ret.setSuccess(true);
		return ret;
	}

}
