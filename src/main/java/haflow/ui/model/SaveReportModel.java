package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="saveReport")
public class SaveReportModel {
	private UUID id;
	private String name;
	private boolean isdirectory;
	
	private UUID parentid;
	private Set<PortletModel> portlets;
	
	@XmlElement
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	
	@XmlElement
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@XmlElement
	public boolean getIsdirectory() {
		return isdirectory;
	}
	public void setIsdirectory(boolean isdirectory) {
		this.isdirectory = isdirectory;
	}
	
	@XmlElement
	public UUID getParentid() {
		return parentid;
	}
	public void setParentid(UUID parentid) {
		this.parentid = parentid;
	}
	
	@XmlElementWrapper(name="portlets")
	@XmlElement( name="portlet")
	public Set<PortletModel> getPortlets() {
		return portlets;
	}
	
	public void setPortlets(Set<PortletModel> portlets) {
		this.portlets = portlets;
	}
}
