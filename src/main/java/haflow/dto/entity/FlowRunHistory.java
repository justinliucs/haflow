package haflow.dto.entity;

import java.util.Date;
import java.util.UUID;

import javax.jdo.annotations.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "flowRunHistory")
public class FlowRunHistory {
	private UUID id;
	private String oozieJobId;
	private String commitMessage;
	private Date timestamp;
	private Flow flow;
	
	@Id
	@Column(name="id", length = 16)
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	
	@Column(name="oozieJobId")
	public String getOozieJobId() {
		return oozieJobId;
	}
	public void setOozieJobId(String oozieJobId) {
		this.oozieJobId = oozieJobId;
	}
	
	@Column(name="commitMessage")
	@Lob
	public String getCommitMessage() {
		return commitMessage;
	}
	public void setCommitMessage(String commitMessage) {
		this.commitMessage = commitMessage;
	}
	
	@Column(name="timestamp")
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	
	@ManyToOne
	@JoinColumn(name = "flowId")
	public Flow getFlow() {
		return flow;
	}

	public void setFlow(Flow flow) {
		this.flow = flow;
	}
}
