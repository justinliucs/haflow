package haflow.flow.entity;

import java.util.List;

public class Topological {

	List<Integer> order;

	public Topological(Digraph G) {
		DirectedCycle cycleFinder = new DirectedCycle(G);
		if (!cycleFinder.hasCycle()) {
			DepthFirstOrder dfs = new DepthFirstOrder(G);
			order = dfs.getReversePost();
		}
	}

	public List<Integer> getOrder() {
		return this.order;
	}

	public boolean isDAG() {
		return this.order != null;
	}
}
