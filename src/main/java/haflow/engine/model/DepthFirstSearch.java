package haflow.engine.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DepthFirstSearch {
	private boolean visited[];
	private List<Integer> preorder;
	private List<Integer> postorder;
	private List<Integer> reversePostorder;

	private boolean[] getVisited() {
		return visited;
	}

	private void setVisited(boolean[] visited) {
		this.visited = visited;
	}

	public List<Integer> getPreorder() {
		return preorder;
	}

	private void setPreorder(List<Integer> preorder) {
		this.preorder = preorder;
	}

	public List<Integer> getPostorder() {
		return postorder;
	}

	private void setPostorder(List<Integer> postorder) {
		this.postorder = postorder;
	}

	public List<Integer> getReversePostorder() {
		return reversePostorder;
	}

	private void setReversePostorder(List<Integer> reversePostorder) {
		this.reversePostorder = reversePostorder;
	}

	public DepthFirstSearch(DirectedGraph graph) {
		this.setPreorder(new ArrayList<Integer>());
		this.setPostorder(new ArrayList<Integer>());
		this.setReversePostorder(new ArrayList<Integer>());
		this.setVisited(new boolean[graph.getNodeCount()]);
		// subgraph of start node
		for( int i = 0; i < visited.length; i++){
			if( !visited[i] )
				doDepthFirstSearch(graph, i);//graph.getStartNodeIndex()
		}
		this.getReversePostorder().addAll(this.getPostorder());
		Collections.reverse(this.getReversePostorder());
	}

	private void doDepthFirstSearch(DirectedGraph graph, int nodeIndex) {
		this.getPreorder().add(nodeIndex);
		this.getVisited()[nodeIndex] = true;
		List<Integer> adjacent = graph.getAdjacentNodeIndex(nodeIndex);
		for (int w : adjacent) {
			if (!this.getVisited()[w]) {
				doDepthFirstSearch(graph, w);
			}
		}
		this.getPostorder().add(nodeIndex);
	}
}
