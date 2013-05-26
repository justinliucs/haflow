package haflow.flow.entity;

import java.util.List;
import java.util.UUID;

public class FlowEntity {
	private UUID id;
	private String name;
	private List<NodeEntity> nodes;
	private List<EdgeEntity> edges;

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

	public List<NodeEntity> getNodes() {
		return nodes;
	}

	public void setNodes(List<NodeEntity> nodes) {
		this.nodes = nodes;
	}

	public List<EdgeEntity> getEdges() {
		return edges;
	}

	public void setEdges(List<EdgeEntity> edges) {
		this.edges = edges;
	}

}
