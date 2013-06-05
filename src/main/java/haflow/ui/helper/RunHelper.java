package haflow.ui.helper;

import java.util.UUID;

import haflow.service.FlowExecuteService;
import haflow.ui.model.RunFlowModel;
import haflow.ui.model.RunFlowResultModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RunHelper {
	private FlowExecuteService flowExecuteService;

	public FlowExecuteService getFlowExecuteService() {
		return flowExecuteService;
	}

	@Autowired
	public void setFlowExecuteService(FlowExecuteService flowExecuteService) {
		this.flowExecuteService = flowExecuteService;
	}

	public RunFlowResultModel runFlow(UUID flowId, RunFlowModel model) {
		RunFlowResultModel result = this.getFlowExecuteService().runFlow(flowId);
		return result;
	}

}
