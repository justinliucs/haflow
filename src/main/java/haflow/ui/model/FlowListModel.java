package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "flowList")
public class FlowListModel {
	private List<FlowBriefModel> flows;

	@XmlElementWrapper(name = "flows")
	@XmlElement(name = "flow")
	public List<FlowBriefModel> getFlows() {
		return flows;
	}

	public void setFlows(List<FlowBriefModel> flows) {
		this.flows = flows;
	}

}
