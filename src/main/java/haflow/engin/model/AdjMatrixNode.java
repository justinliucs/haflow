package haflow.engin.model;

public class AdjMatrixNode {
	private int index;
	private Path path;
	
	public AdjMatrixNode(int index, Path path) {
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
	public Path getPath() {
		return path;
	}
	public void setPath(Path path) {
		this.path = path;
	}
	
}
