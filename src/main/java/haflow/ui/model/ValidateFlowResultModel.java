package haflow.ui.model;

import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "runFlowResult")
public class ValidateFlowResultModel {
	
	private UUID flowId;
	private boolean commited;
	private String message;
	
	private String jobId;//0000006-130603182153787-oozie-root-W
	
	@XmlElement
	public UUID getFlowId() {
		return flowId;
	}
	public void setFlowId(UUID flowId) {
		this.flowId = flowId;
	}
	
	@XmlElement
	public boolean isCommited() {
		return commited;
	}
	public void setCommited(boolean commited) {
		this.commited = commited;
	}
	
	@XmlElement
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	@XmlElement
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	
}
