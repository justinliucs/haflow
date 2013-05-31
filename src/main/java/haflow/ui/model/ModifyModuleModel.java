package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "modifyModule")
public class ModifyModuleModel {
	private UUID id;
	private String newName;
	private Set<ConfigurationModel> newConfigurations;

	@XmlElement
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@XmlElement
	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	@XmlElementWrapper(name = "newConfigurations")
	@XmlElement(name = "newConfiguration")
	public Set<ConfigurationModel> getNewConfigurations() {
		return newConfigurations;
	}

	public void setNewConfigurations(Set<ConfigurationModel> newConfigurations) {
		this.newConfigurations = newConfigurations;
	}

}
