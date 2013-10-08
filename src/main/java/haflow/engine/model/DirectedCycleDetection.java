package haflow.engine.model;

import java.util.List;
import java.util.Stack;

public class DirectedCycleDetection {
	private boolean[] visited;
	private boolean[] onStack;
	private int[] edgeTo;
	private Stack<Integer> cycle;

	private boolean[] getVisited() {
		return visited;
	}

	private void setVisited(boolean[] visited) {
		this.visited = visited;
	}

	private boolean[] getOnStack() {
		return onStack;
	}

	private void setOnStack(boolean[] onStack) {
		this.onStack = onStack;
	}

	private int[] getEdgeTo() {
		return edgeTo;
	}

	private void setEdgeTo(int[] edgeTo) {
		this.edgeTo = edgeTo;
	}

	private Stack<Integer> getCycle() {
		return cycle;
	}

	private void setCycle(Stack<Integer> cycle) {
		this.cycle = cycle;
	}

	public boolean hasCycle() {
		return this.getCycle() != null;
	}

	public DirectedCycleDetection(DirectedGraph graph) {
		this.setVisited(new boolean[graph.getNodeCount()]);
		this.setOnStack(new boolean[graph.getNodeCount()]);
		this.setEdgeTo(new int[graph.getNodeCount()]);
		detectCycle(graph, graph.getStartNodeIndex());
	}

	private void detectCycle(DirectedGraph graph, int nodeIndex) {
		this.getOnStack()[nodeIndex] = true;
		this.getVisited()[nodeIndex] = true;
		List<Integer> adjacentNodeIndex = graph.getAdjacentNodeIndex(nodeIndex);
		for (int w : adjacentNodeIndex) {
			if (this.hasCycle())
				return;
			if (!this.getVisited()[w]) {
				this.getEdgeTo()[w] = nodeIndex;
				detectCycle(graph, w);
			} else if (this.getOnStack()[w]) {
				this.setCycle(new Stack<Integer>());
				for (int i = nodeIndex; i != w; i = this.getEdgeTo()[i]) {
					this.getCycle().push(i);
				}
				this.getCycle().push(w);
			}
		}
		this.getOnStack()[nodeIndex] = false;
	}
}
