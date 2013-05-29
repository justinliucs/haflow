package haflow.ui.model;

import java.util.Set;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "mergeFlow")
public class MergeFlowModel {
	private String name;
	private Set<NodeModel> nodes;
	private Set<EdgeModel> edges;

	@XmlElement
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
