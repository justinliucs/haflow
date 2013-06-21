package haflow.engin.model;

import haflow.dto.entity.Node;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Action {
	private Node node;
	private Map<String, String> configurations;
	
	public Action(Node node){
		this.node = node;
		this.configurations = new HashMap<String, String>();
	}
	
	public Map<String, String> getConfigurations(){
		return this.configurations;
	}
	
	public UUID getId() {
		return node.getId();
	}

	public UUID getModuleId() {
		return node.getModuleId();
	}

	public String getName() {
		return node.getName();
	}

	public Node getNode(){
		return this.node;
	}
}
