package haflow.engin.model;

import haflow.ui.model.ModuleConfigurationModel;
import haflow.ui.model.ModuleEndpointModel;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "module")
public class NodeConfiguration {
	private UUID id;
	private String name;
	private String category;
	private Set<ModuleConfigurationModel> configurations;
	private Set<ModuleEndpointModel> inputs;
	private Set<ModuleEndpointModel> outputs;

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
	public Set<ModuleConfigurationModel> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<ModuleConfigurationModel> configurations) {
		this.configurations = configurations;
	}

	@XmlElementWrapper(name = "inputs")
	@XmlElement(name = "input")
	public Set<ModuleEndpointModel> getInputs() {
		return inputs;
	}

	public void setInputs(Set<ModuleEndpointModel> inputs) {
		this.inputs = inputs;
	}

	@XmlElementWrapper(name = "outputs")
	@XmlElement(name = "output")
	public Set<ModuleEndpointModel> getOutputs() {
		return outputs;
	}

	public void setOutputs(Set<ModuleEndpointModel> outputs) {
		this.outputs = outputs;
	}	
}