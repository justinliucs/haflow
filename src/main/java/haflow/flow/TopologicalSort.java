package haflow.flow;

import java.util.List;

public class TopologicalSort {

	private List<Integer> order;
	private boolean directedAcyclicGraph;

	public List<Integer> getOrder() {
		return this.order;
	}

	private void setOrder(List<Integer> order) {
		this.order = order;
	}

	public boolean isDirectedAcyclicGraph() {
		return directedAcyclicGraph;
	}

	private void setDirectedAcyclicGraph(boolean directedAcyclicGraph) {
		this.directedAcyclicGraph = directedAcyclicGraph;
	}

	public TopologicalSort(DirectedGraph graph) {
		DirectedCycleDetection cycleFinder = new DirectedCycleDetection(graph);
		if (!cycleFinder.hasCycle()) {
			DepthFirstSearch depthFirstSearch = new DepthFirstSearch(graph);
			this.setOrder(depthFirstSearch.getReversePostorder());
			this.setDirectedAcyclicGraph(true);
		}
		this.setDirectedAcyclicGraph(false);
	}

}
