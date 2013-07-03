package haflow.ui.model;

import java.util.List;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "module")
public class ModuleBriefModel {
	private UUID id;
	private String name;
	private String category;
	private List<ModuleConfigurationModel> configurations;
	private List<ModuleEndpointModel> inputs;
	private List<ModuleEndpointModel> outputs;

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
	public List<ModuleConfigurationModel> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(List<ModuleConfigurationModel> configurations) {
		this.configurations = configurations;
	}

	@XmlElementWrapper(name = "inputs")
	@XmlElement(name = "input")
	public List<ModuleEndpointModel> getInputs() {
		return inputs;
	}

	public void setInputs(List<ModuleEndpointModel> inputs) {
		this.inputs = inputs;
	}

	@XmlElementWrapper(name = "outputs")
	@XmlElement(name = "output")
	public List<ModuleEndpointModel> getOutputs() {
		return outputs;
	}

	public void setOutputs(List<ModuleEndpointModel> outputs) {
		this.outputs = outputs;
	}
}
