package haflow.service;

import haflow.dto.entity.Flow;
import haflow.dto.entity.FlowRunHistory;
import haflow.engine.RunFlowResult;
import haflow.engine.oozie.OozieEngine;
import haflow.ui.model.RunFlowResultModel;
import haflow.ui.model.ValidateFlowResultModel;
import haflow.util.SessionHelper;

import java.util.Date;
import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FlowExecuteService {

	private FlowService flowService;
	private OozieEngine engin;
	private SessionHelper sessionHelper;
	
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

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	// TODO
	public ValidateFlowResultModel validateFlow(UUID flowId) {
		// Flow flow = (Flow) this.getFlowService().getFlow(flowId);
		// this.getEngin().validateFlow(flow);
		return null;
	}

	public RunFlowResultModel runFlow(UUID flowId,int userid) {
		RunFlowResultModel result = new RunFlowResultModel();
		result.setFlowId(flowId);
		result.setCommited(false);
		StringBuilder messageBuilder = new StringBuilder();

		Flow flow = (Flow) this.getFlowService().getFlow(flowId, userid);
		
		if (flow == null) {
			messageBuilder.append("Flow " + flowId + " not found!");
			result.setMessage(messageBuilder.toString());
			return result;
		}

		RunFlowResult enginResult = this.getEngin().runFlow(flow);

		//record run history to database
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		
		FlowRunHistory feh = new FlowRunHistory();
//		feh.setId(UUID.randomUUID());
		feh.setOozieJobId(enginResult.getJobId());
		feh.setCommitMessage(enginResult.getMessage());
		feh.setTimestamp(new Date());
		feh.setFlow(flow);
		
		try{
			session.merge(feh);
			transaction.commit();
		}catch(Exception e){
			transaction.rollback();
		}finally{
			session.close();
		}
		
		result.setCommited(enginResult.isCommitted());
		result.setJobId(enginResult.getJobId());
		result.setMessage(enginResult.getMessage());

		return result;
	}

}
