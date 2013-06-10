package haflow.entity;

import java.util.Set;
import java.util.UUID;

public class Module {
	private UUID id;
	private String name;
	private String category;
	private Set<ModuleConfiguration> configurations;
	private Set<ModuleEndpoint> inputs;
	private Set<ModuleEndpoint> outputs;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Set<ModuleConfiguration> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<ModuleConfiguration> configurations) {
		this.configurations = configurations;
	}

	public Set<ModuleEndpoint> getInputs() {
		return inputs;
	}

	public void setInputs(Set<ModuleEndpoint> inputs) {
		this.inputs = inputs;
	}

	public Set<ModuleEndpoint> getOutputs() {
		return outputs;
	}

	public void setOutputs(Set<ModuleEndpoint> outputs) {
		this.outputs = outputs;
	}

}
