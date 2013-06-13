package haflow.flow.entity;

import java.util.List;
import java.util.Stack;

public class DirectedCycle {
	private boolean[] marked;
	private boolean[] onStack;
	private int[] edgeTo;
	private Stack<Integer> cycle;

	public DirectedCycle(Digraph G) {
		marked = new boolean[G.getV()];
		onStack = new boolean[G.getV()];
		edgeTo = new int[G.getV()];
		dfs(G, G.getStartNode());
	}

	private void dfs(Digraph G, int v) {
		onStack[v] = true;
		marked[v] = true;
		List<Integer> adj = G.getAdj(v);
		for (int w : adj) {
			if (this.hasCycle())
				return;
			if (!marked[w]) {
				edgeTo[w] = v;
				dfs(G, w);
			} else if (onStack[w]) {
				cycle = new Stack<Integer>();
				for (int i = v; i != w; i = edgeTo[i]) {
					cycle.push(i);
				}
				cycle.push(w);
			}
		}

		onStack[v] = false;
	}

	public boolean hasCycle() {
		return cycle != null;
	}

	public Stack<Integer> cycle() {
		return cycle;
	}
}
