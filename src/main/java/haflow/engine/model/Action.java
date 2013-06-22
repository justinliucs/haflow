package haflow.engine.model;

import haflow.dto.entity.Node;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Action {
	private Node node;
	private Map<String, String> configurations;

	public Node getNode() {
		return node;
	}

	private void setNode(Node node) {
		this.node = node;
	}

	public Map<String, String> getConfigurations() {
		return configurations;
	}

	private void setConfigurations(Map<String, String> configurations) {
		this.configurations = configurations;
	}

	public Action(Node node) {
		this.setNode(node);
		this.setConfigurations(new HashMap<String, String>());
	}

	public UUID getNodeId() {
		return this.getNode().getId();
	}

	public UUID getModuleId() {
		return this.getNode().getModuleId();
	}

	public String getNodeName() {
		return this.getNode().getName();
	}

}
