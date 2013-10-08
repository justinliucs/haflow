package haflow.service;

import haflow.dto.entity.Flow;
import haflow.dto.entity.FlowRunHistory;
import haflow.util.SessionHelper;

import java.util.Set;
import java.util.UUID;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RunHistoryService {
	private SessionHelper sessionHelper;
	
	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public Set<FlowRunHistory> getFlowExecuteHistorys(UUID flowId){
		Session session = this.getSessionHelper().openSession();
		try{
			Flow flow = (Flow) session.get(Flow.class, flowId);
			session.close();
			return flow.getExeHistory();
		}catch(Exception e){
			e.printStackTrace();
			session.close();
			return null;
		}
		
	}
}
