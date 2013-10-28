package haflow.ui.controller;

import haflow.ui.helper.FlowHelper;
import haflow.ui.model.SaveFlowModel;
import haflow.ui.model.FlowListModel;
import haflow.ui.model.FlowModel;
import haflow.ui.model.SaveFlowResultModel;
import haflow.ui.model.RemoveFlowModel;
import haflow.ui.model.RemoveFlowResultModel;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

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

	private FlowHelper getFlowHelper() {
		return flowHelper;
	}

	@Autowired
	private void setFlowHelper(FlowHelper flowHelper) {
		this.flowHelper = flowHelper;
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public FlowListModel get(HttpServletRequest request) {
		return this.getFlowHelper().getFlowList((Integer)request.getSession().getAttribute("userid"));
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.GET)
	@ResponseBody
	public FlowModel get(@PathVariable UUID flowId,HttpServletRequest request) {
		return this.getFlowHelper().getFlow(flowId,(Integer)request.getSession().getAttribute("userid"));
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.POST)
	@ResponseBody
	public SaveFlowResultModel post(@PathVariable UUID flowId,
			@RequestBody SaveFlowModel model,HttpServletRequest request) {
		return this.getFlowHelper().saveFlow(flowId, model,(Integer)request.getSession().getAttribute("userid"));
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.PUT)
	@ResponseBody
	public SaveFlowResultModel put(@PathVariable UUID flowId,
			@RequestBody SaveFlowModel model,HttpServletRequest request) {
		return this.getFlowHelper().saveFlow(flowId, model,(Integer)request.getSession().getAttribute("userid"));
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.DELETE)
	@ResponseBody
	public RemoveFlowResultModel delete(@PathVariable UUID flowId,
			@RequestBody RemoveFlowModel model,HttpServletRequest request) {
		return this.getFlowHelper().removeFlow(flowId, model,(Integer)request.getSession().getAttribute("userid"));
	}

}
