package haflow.ui.helper;

import haflow.dto.entity.FlowRunHistory;
import haflow.service.RunHistoryService;
import haflow.ui.model.FlowRunHistoryListModel;
import haflow.ui.model.FlowRunHistoryModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RunHistoryHelper {

	private RunHistoryService runHistoryService;

	public RunHistoryService getRunHistoryService() {
		return runHistoryService;
	}

	@Autowired
	public void setRunHistoryService(RunHistoryService runHistoryService) {
		this.runHistoryService = runHistoryService;
	}

	public FlowRunHistoryListModel getFlowRunHistoryList(UUID flowId) {
		Set<FlowRunHistory> list = this.getRunHistoryService()
				.getFlowExecuteHistorys(flowId);
		List<FlowRunHistoryModel> flowHistorys = new ArrayList<FlowRunHistoryModel>();
		for (FlowRunHistory feh : list) {
			FlowRunHistoryModel frhm = new FlowRunHistoryModel();
			frhm.setId(feh.getId());
			frhm.setOozieJobId(feh.getOozieJobId());
			frhm.setCommitMessage(feh.getCommitMessage());
			frhm.setTimestamp(feh.getTimestamp());
			flowHistorys.add(frhm);
		}
		FlowRunHistoryListModel frhlm = new FlowRunHistoryListModel();
		frhlm.setFlowHistorys(flowHistorys);
		return frhlm;
	}
}
