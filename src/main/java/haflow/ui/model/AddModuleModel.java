package haflow.ui.model;

import java.util.Set;

import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

@XmlRootElement(name = "addModule")
public class AddModuleModel {
	private String name;
	private Set<ConfigurationModel> configurations;

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
