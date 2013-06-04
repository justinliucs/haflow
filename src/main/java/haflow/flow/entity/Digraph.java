package haflow.flow.entity;

import haflow.entity.Edge;
import haflow.entity.Node;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Digraph {
	
	private List<Node> nodeList;
	private Node startNode;
	private Map<Node, Integer> index;
	private List<List<Integer>> adj;
	
	public Digraph(Set<Edge> edges, Set<Node> nodes, Node startNode){
		nodeList = new ArrayList<Node>();
		index = new HashMap<Node, Integer>();
		this.startNode = startNode;
		
		int i = 0;
		for( Node node : nodes ){
			nodeList.add(node);
			index.put(node, i++);
		}
		
		adj = new ArrayList<List<Integer>>();
		for( i = 0; i < nodeList.size(); i++){
			adj.add(new ArrayList<Integer>());
		}
		
		for( Edge edge : edges ){
			Node source = edge.getSourceNode();
			Node target = edge.getTargetNode();
			adj.get(index.get(source)).add(index.get(target));
		}
	}
	
	public int getV(){
		return nodeList.size();
	}
	
	public List<Integer> getAdj(int i){
		assert( i>= 0 && i < adj.size());
		return adj.get(i);
	}
	
	public int getStartNode(){
		return index.get(startNode);
	}
	
	public Node getNode(int i){
		assert( i>= 0 && i < adj.size());
		return nodeList.get(i);
	}
	
	public int getIndex(Node n){
		assert(index.containsKey(n));
		return index.get(n);
	}
	
	public static void main(String[] args) {
		
	}
}
