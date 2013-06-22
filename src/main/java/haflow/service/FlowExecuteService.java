package haflow.service;

import haflow.dto.entity.Flow;
import haflow.engine.RunFlowResult;
import haflow.engine.oozie.OozieEngine;
import haflow.ui.model.RunFlowResultModel;
import haflow.ui.model.ValidateFlowResultModel;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FlowExecuteService {

	private FlowService flowService;
	private OozieEngine engin;

	public OozieEngine getEngin() {
		return engin;
	}

	@Autowired
	public void setEngin(OozieEngine engin) {
		this.engin = engin;
	}

	private FlowService getFlowService() {
		return flowService;
	}

	@Autowired
	private void setFlowService(FlowService flowService) {
		this.flowService = flowService;
	}

	// TODO
	public ValidateFlowResultModel validateFlow(UUID flowId) {
		// Flow flow = (Flow) this.getFlowService().getFlow(flowId);
		// this.getEngin().validateFlow(flow);
		return null;
	}

	public RunFlowResultModel runFlow(UUID flowId) {
		RunFlowResultModel result = new RunFlowResultModel();
		result.setFlowId(flowId);
		result.setCommited(false);
		StringBuilder messageBuilder = new StringBuilder();

		Flow flow = (Flow) this.getFlowService().getFlow(flowId);
		if (flow == null) {
			messageBuilder.append("Flow " + flowId + " not found!");
			result.setMessage(messageBuilder.toString());
			return result;
		}

		RunFlowResult enginResult = this.getEngin().runFlow(flow);

		result.setCommited(enginResult.isCommitted());
		result.setJobId(enginResult.getJobId());
		result.setMessage(enginResult.getMessage());

		return result;
	}

}
