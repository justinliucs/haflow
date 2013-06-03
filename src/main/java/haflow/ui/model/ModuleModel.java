package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "module")
public class ModuleModel {
	private UUID id;
	private String name;
	private String category;
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

	@XmlElement
	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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
