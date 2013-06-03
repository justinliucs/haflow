package haflow.entity;

import java.util.Set;
import java.util.UUID;

public class Module {
	private UUID id;
	private String name;
	private String category;
	private Set<ModuleConfiguration> configurations;

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

}
