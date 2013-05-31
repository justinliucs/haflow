package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "module")
public class ModuleBriefModel {
	private UUID id;
	private String name;
	private Set<ConfigurationModel> configurations;

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

	@XmlElementWrapper(name = "configurations")
	@XmlElement(name = "configuration")
	public Set<ConfigurationModel> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<ConfigurationModel> configurations) {
		this.configurations = configurations;
	}
}
