package haflow.engine.model;

import haflow.dto.entity.Edge;

public class AdjMatrixNode {
	private int index;
	private Edge path;
	
	public AdjMatrixNode(int index, Edge path) {
		super();
		this.index = index;
		this.path = path;
	}
	
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public Edge getPath() {
		return path;
	}
	public void setPath(Edge path) {
		this.path = path;
	}
	
}
