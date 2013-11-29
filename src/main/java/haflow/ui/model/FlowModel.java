package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "saveFlow")
public class FlowModel {
	private UUID id;
	private String name;
	private boolean node;
	private String path;
	private String parentpath;
	private Set<NodeModel> nodes;
	private Set<EdgeModel> edges;

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
	public boolean getNode() {
		return node;
	}

	public void setNode(boolean node) {
		this.node = node;
	}
	
	@XmlElement
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	@XmlElement
	public String getParentpath() {
		return parentpath;
	}

	public void setParentpath(String parentpath) {
		this.parentpath = parentpath;
	}

	@XmlElementWrapper(name = "nodes")
	@XmlElement(name = "item")
	public Set<NodeModel> getNodes() {
		return nodes;
	}

	public void setNodes(Set<NodeModel> nodes) {
		this.nodes = nodes;
	}

	@XmlElementWrapper(name = "edges")
	@XmlElement(name = "edge")
	public Set<EdgeModel> getEdges() {
		return edges;
	}

	public void setEdges(Set<EdgeModel> edges) {
		this.edges = edges;
	}

}
