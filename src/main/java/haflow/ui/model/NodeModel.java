package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "node")
public class NodeModel {
	private UUID id;
	private UUID flowId;
	private UUID moduleId;
	private String name;
	private PositionModel position;
	private Set<ConfigurationItemModel> configurations;

	@XmlElement
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@XmlElement
	public UUID getFlowId() {
		return flowId;
	}

	public void setFlowId(UUID flowId) {
		this.flowId = flowId;
	}

	@XmlElement
	public UUID getModuleId() {
		return moduleId;
	}

	public void setModuleId(UUID moduleId) {
		this.moduleId = moduleId;
	}

	@XmlElement
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlElement
	public PositionModel getPosition() {
		return position;
	}

	public void setPosition(PositionModel position) {
		this.position = position;
	}

	@XmlElementWrapper(name = "configurations")
	@XmlElement(name = "configuration")
	public Set<ConfigurationItemModel> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<ConfigurationItemModel> configurations) {
		this.configurations = configurations;
	}

}
