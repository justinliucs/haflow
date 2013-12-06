package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="portlet")
public class PortletModel {
	private UUID id;
	private String title;
	private String type;
	private int position;
	
	private UUID reportId;
	private Set<PortletConfigurationItemModel> configurations;

	@XmlElement
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}

	@XmlElement
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	@XmlElement
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	@XmlElement
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}

	@XmlElement
	public UUID getReportId() {
		return reportId;
	}
	public void setReportId(UUID reportId) {
		this.reportId = reportId;
	}
	
	@XmlElementWrapper(name="configurations")
	@XmlElement(name="configuration")
	public Set<PortletConfigurationItemModel> getConfigurations() {
		return configurations;
	}
	public void setConfigurations(Set<PortletConfigurationItemModel> configurations) {
		this.configurations = configurations;
	}
}
