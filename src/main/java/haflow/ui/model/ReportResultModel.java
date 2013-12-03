package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class ReportResultModel {
	private boolean success;
	private UUID reportId;
	private Set<UUID> deletedReportIds;
	private String message;
	
	@XmlElement
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	@XmlElement
	public UUID getReportId() {
		return reportId;
	}
	public void setReportId(UUID reportId) {
		this.reportId = reportId;
	}
	
	@XmlElement
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	@XmlElementWrapper(name = "deletedReportIds")
	@XmlElement(name = "deletedReportId")
	public Set<UUID> getDeletedReportIds() {
		return deletedReportIds;
	}
	
	public void setDeletedReportIds(Set<UUID> deletedReportIds) {
		this.deletedReportIds = deletedReportIds;
	}
}
