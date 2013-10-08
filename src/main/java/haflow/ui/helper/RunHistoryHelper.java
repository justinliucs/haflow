package haflow.ui.helper;

import haflow.dto.entity.FlowRunHistory;
import haflow.service.RunHistoryService;
import haflow.ui.model.FlowRunHistoryListModel;
import haflow.ui.model.FlowRunHistoryModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
		Collections.sort(flowHistorys, new Comparator<FlowRunHistoryModel>(){
			public int compare(FlowRunHistoryModel o1, FlowRunHistoryModel o2) {
				if( o1 == o2) return 0;
				FlowRunHistoryModel f1 = (FlowRunHistoryModel)o1;
				FlowRunHistoryModel f2 = (FlowRunHistoryModel)o2;
				if( f1.getTimestamp().before(f2.getTimestamp())){
					return 1;
				}else if(f1.getTimestamp().after(f2.getTimestamp()) ){
					return -1;
				}
				return 0;
			}
		});
		FlowRunHistoryListModel frhlm = new FlowRunHistoryListModel();
		frhlm.setFlowHistorys(flowHistorys);
		return frhlm;
	}
}
