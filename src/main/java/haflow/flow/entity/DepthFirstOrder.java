package haflow.flow.entity;

import java.util.ArrayList;
import java.util.List;

public class DepthFirstOrder {
	private boolean marked[];
	private List<Integer> pre;
	private List<Integer> post;
	private List<Integer> reversePost;
	
	public DepthFirstOrder(Digraph G){
		pre = new ArrayList<Integer>();
		post = new ArrayList<Integer>();
		reversePost = new ArrayList<Integer>();
		marked = new boolean[G.getV()];
		
		dfs(G, G.getStartNode());
		
		reversePost.addAll(post);
		java.util.Collections.reverse(reversePost);
	}
	
	private void dfs(Digraph G, int v){
		pre.add(v);
		
		marked[v] = true;
		List<Integer> adj = G.getAdj(v);
		for( int w : adj ){
			if(!marked[w]){
				dfs(G, w);
			}
		}
		
		post.add(v);
	}
	
	public List<Integer> getPre(){
		return pre;
	}
	
	public List<Integer> getPost(){
		return post;
	}
	
	public List<Integer> getReversePost(){
		return reversePost;
	}
}
