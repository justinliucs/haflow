package haflow.engine;

import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;

public class RunFlowResult {
	private UUID flowId;
	private boolean committed;
	private String message;
	private String jobId;// 0000006-130603182153787-oozie-root-W

	@XmlElement
	public UUID getFlowId() {
		return flowId;
	}

	public void setFlowId(UUID flowId) {
		this.flowId = flowId;
	}

	@XmlElement
	public boolean isCommitted() {
		return committed;
	}

	public void setCommitted(boolean committed) {
		this.committed = committed;
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
