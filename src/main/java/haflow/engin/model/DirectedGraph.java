package haflow.engin.model;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class DirectedGraph {
	private List<Action> nodeList;
	private List<Path> edgeList;
	private Action startNode;
	private Map<Action, Integer> indexMap;
	private List<List<AdjMatrixNode>> adjacentMatrix;

	public DirectedGraph(Set<Node> nodes, Set<Edge> edges, Node startNode) {
		this.nodeList = new ArrayList<Action>();
		this.edgeList = new ArrayList<Path>();
		this.startNode = new Action(startNode);
		this.indexMap = new HashMap<Action, Integer>();

		int i = 0;
		for (Node node : nodes) {
			Action newAction = new Action(node);
			this.nodeList.add(newAction);
			this.indexMap.put(newAction, i++);
		}

		this.adjacentMatrix = new ArrayList<List<AdjMatrixNode>>();
		for (i = 0; i < this.nodeList.size(); i++) {
			this.adjacentMatrix.add(new ArrayList<AdjMatrixNode>());
		}

		// TODO: Consider endpoints
		for (Edge edge : edges) {
			Path path = new Path(edge);
			this.edgeList.add(path);
			Node source = edge.getSourceNode();
			Node target = edge.getTargetNode();
			this.adjacentMatrix.get(this.indexMap.get(source))
					.add(new AdjMatrixNode(this.indexMap.get(target), path));
		}
	}

	public int getNodeCount() {
		return this.nodeList.size();
	}

	public List<Integer> getAdjacentNodeIndex(int nodeIndex) {
		// TODO: Consider endpoints
		assert (nodeIndex >= 0 && nodeIndex < this.adjacentMatrix.size());
		List<Integer> result = new ArrayList<Integer>();
		List<AdjMatrixNode> adj = this.adjacentMatrix.get(nodeIndex);
		for( int i = 0; i < adj.size(); i++){
			result.add(adj.get(i).getIndex());
		}
		return result;
	}
	
	public List<AdjMatrixNode> getAdjacent(int nodeIndex) {
		// TODO: Consider endpoints
		assert (nodeIndex >= 0 && nodeIndex < this.adjacentMatrix.size());
		return this.adjacentMatrix.get(nodeIndex);
	}

	public int getStartNodeIndex() {
		return this.indexMap.get(this.startNode);
	}

	public Action getNode(int nodeIndex) {
		assert (nodeIndex >= 0 && nodeIndex < this.adjacentMatrix.size());
		return this.nodeList.get(nodeIndex);
	}

	public int getNodeIndex(Node node) {
		assert (this.indexMap.containsKey(node));
		return this.indexMap.get(node);
	}

//	public Map<String, Node> getInputs(Node node) {
//		Map<String, Node> ret = new HashMap<String, Node>();
//		for (Path edge : this.edgeList) {
//			if (edge.getTargetNode() == node) {
//				ret.put(edge.getTargetEndpoint(), edge.getSourceNode());
//			}
//		}
//		return ret;
//	}
//
//	public Map<String, Node> getOutputs(Node node) {
//		Map<String, Node> ret = new HashMap<String, Node>();
//		for (Edge edge : this.edgeList) {
//			if (edge.getSourceNode() == node) {
//				ret.put(edge.getSourceEndpoint(), edge.getSourceNode());
//			}
//		}
//		return ret;
//	}
	
//	private List<Node> getNodeList() {
//		return nodeList;
//	}
//
//	private void setNodeList(List<Node> nodeList) {
//		this.nodeList = nodeList;
//	}
//
//	private List<Edge> getEdgeList() {
//		return edgeList;
//	}
//
//	private void setEdgeList(List<Edge> edgeList) {
//		this.edgeList = edgeList;
//	}
//
//	private Node getStartNode() {
//		return startNode;
//	}
//
//	private void setStartNode(Node startNode) {
//		this.startNode = startNode;
//	}
//
//	private Map<Node, Integer> getIndexMap() {
//		return indexMap;
//	}
//
//	private void setIndexMap(Map<Node, Integer> indexMap) {
//		this.indexMap = indexMap;
//	}
//
//	private List<List<Integer>> getAdjacentMatrix() {
//		return adjacentMatrix;
//	}
//
//	private void setAdjacentMatrix(List<List<Integer>> adjacentMatrix) {
//		this.adjacentMatrix = adjacentMatrix;
//	}
}
