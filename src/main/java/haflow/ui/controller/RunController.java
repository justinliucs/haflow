package haflow.ui.controller;

import java.util.UUID;

import haflow.ui.helper.RunHelper;
import haflow.ui.model.RunFlowModel;
import haflow.ui.model.RunFlowResultModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/run")
public class RunController {
	private RunHelper runHelper;

	public RunHelper getRunHelper() {
		return runHelper;
	}

	@Autowired
	public void setRunHelper(RunHelper runHelper) {
		this.runHelper = runHelper;
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.POST)
	@ResponseBody
	public RunFlowResultModel post(@PathVariable UUID flowId,
			@RequestBody RunFlowModel model) {
		return this.getRunHelper().runFlow(flowId, model);
	}
}
