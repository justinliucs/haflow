package haflow.ui.controller;

import haflow.ui.helper.FlowHelper;
import haflow.ui.model.MergeFlowModel;
import haflow.ui.model.FlowListModel;
import haflow.ui.model.FlowModel;
import haflow.ui.model.MergeFlowResultModel;
import haflow.ui.model.RemoveFlowModel;
import haflow.ui.model.RemoveFlowResultModel;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/flow")
public class FlowController {
	private FlowHelper flowHelper;

	public FlowHelper getFlowHelper() {
		return flowHelper;
	}

	@Autowired
	public void setFlowHelper(FlowHelper flowHelper) {
		this.flowHelper = flowHelper;
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public FlowListModel get() {
		return this.getFlowHelper().getFlowList();
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.GET)
	@ResponseBody
	public FlowModel get(@PathVariable UUID flowId) {
		return this.getFlowHelper().getFlow(flowId);
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.POST)
	@ResponseBody
	public MergeFlowResultModel post(@PathVariable UUID flowId,
			@RequestBody MergeFlowModel model) {
		System.out.println(model.getName());
		return this.getFlowHelper().mergeFlow(flowId, model);
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.PUT)
	@ResponseBody
	public MergeFlowResultModel put(@PathVariable UUID flowId,
			@RequestBody MergeFlowModel model) {
		return this.getFlowHelper().mergeFlow(flowId, model);
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.DELETE)
	@ResponseBody
	public RemoveFlowResultModel delete(@PathVariable UUID flowId,
			@RequestBody RemoveFlowModel model) {
		return this.getFlowHelper().removeFlow(flowId, model);
	}

}
