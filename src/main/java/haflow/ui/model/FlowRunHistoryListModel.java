package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "flowRunHistoryList")
public class FlowRunHistoryListModel {

	private List<FlowRunHistoryModel> flowHistorys;

	@XmlElementWrapper(name = "flowHistorys")
	@XmlElement(name = "flowHistory")
	public List<FlowRunHistoryModel> getFlowHistorys() {
		return flowHistorys;
	}

	public void setFlowHistorys(List<FlowRunHistoryModel> flowHistorys) {
		this.flowHistorys = flowHistorys;
	}

}
