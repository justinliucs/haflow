package haflow.engin.model;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class DirectedGraphOld {
	private List<Node> nodeList;
	private List<Edge> edgeList;
	private Node startNode;
	private Map<Node, Integer> indexMap;
	private List<List<Integer>> adjacentMatrix;

	private List<Node> getNodeList() {
		return nodeList;
	}

	private void setNodeList(List<Node> nodeList) {
		this.nodeList = nodeList;
	}

	private List<Edge> getEdgeList() {
		return edgeList;
	}

	private void setEdgeList(List<Edge> edgeList) {
		this.edgeList = edgeList;
	}

	private Node getStartNode() {
		return startNode;
	}

	private void setStartNode(Node startNode) {
		this.startNode = startNode;
	}

	private Map<Node, Integer> getIndexMap() {
		return indexMap;
	}

	private void setIndexMap(Map<Node, Integer> indexMap) {
		this.indexMap = indexMap;
	}

	private List<List<Integer>> getAdjacentMatrix() {
		return adjacentMatrix;
	}

	private void setAdjacentMatrix(List<List<Integer>> adjacentMatrix) {
		this.adjacentMatrix = adjacentMatrix;
	}

	public DirectedGraphOld(Set<Node> nodes, Set<Edge> edges, Node startNode) {
		this.setNodeList(new ArrayList<Node>());
		this.setEdgeList(new ArrayList<Edge>());
		this.setStartNode(startNode);
		this.setIndexMap(new HashMap<Node, Integer>());

		int i = 0;
		for (Node node : nodes) {
			this.getNodeList().add(node);
			this.getIndexMap().put(node, i++);
		}

		this.setAdjacentMatrix(new ArrayList<List<Integer>>());
		for (i = 0; i < this.getNodeList().size(); i++) {
			this.getAdjacentMatrix().add(new ArrayList<Integer>());
		}

		// TODO: Consider endpoints
		for (Edge edge : edges) {
			this.getEdgeList().add(edge);
			Node source = edge.getSourceNode();
			Node target = edge.getTargetNode();
			this.getAdjacentMatrix().get(this.getIndexMap().get(source))
					.add(this.getIndexMap().get(target));
		}
	}

	public int getNodeCount() {
		return this.getNodeList().size();
	}

	public List<Integer> getAdjacentNodeIndex(int nodeIndex) {
		// TODO: Consider endpoints
		assert (nodeIndex >= 0 && nodeIndex < this.getAdjacentMatrix().size());
		return this.getAdjacentMatrix().get(nodeIndex);
	}

	public int getStartNodeIndex() {
		return this.getIndexMap().get(this.getStartNode());
	}

	public Node getNode(int nodeIndex) {
		assert (nodeIndex >= 0 && nodeIndex < this.getAdjacentMatrix().size());
		return this.getNodeList().get(nodeIndex);
	}

	public int getNodeIndex(Node node) {
		assert (this.getIndexMap().containsKey(node));
		return this.getIndexMap().get(node);
	}

	public Map<String, Node> getInputs(Node node) {
		Map<String, Node> ret = new HashMap<String, Node>();
		for (Edge edge : this.getEdgeList()) {
			if (edge.getTargetNode() == node) {
				ret.put(edge.getTargetEndpoint(), edge.getSourceNode());
			}
		}
		return ret;
	}

	public Map<String, Node> getOutputs(Node node) {
		Map<String, Node> ret = new HashMap<String, Node>();
		for (Edge edge : this.getEdgeList()) {
			if (edge.getSourceNode() == node) {
				ret.put(edge.getSourceEndpoint(), edge.getSourceNode());
			}
		}
		return ret;
	}
}
