package haflow.engine.model;

import haflow.dto.entity.Edge;


public class Path {
//	private Edge edge;
	
	
	private String sourceEndPoint;
//	private Action sourceAction;
	
	private String targetEndPoint;
//	private Action targetAction;
	
//	public Path(Edge edge, Action src, Action target){
//		this.sourceEndPoint = edge.getSourceEndpoint();
//		this.targetEndPoint = edge.getTargetEndpoint();
//		this.sourceAction = src;
//		this.targetAction = target;
//	}
	
	public Path(Edge edge){
		this.sourceEndPoint = edge.getSourceEndpoint();
		this.targetEndPoint = edge.getTargetEndpoint();
	}
	
//	public UUID getId() {
//		return this.edge.getId();
//	}

	public String getSourceEndPoint() {
		return sourceEndPoint;
	}

//	public Action getSourceAction() {
//		return sourceAction;
//	}

	public String getTargetEndPoint() {
		return targetEndPoint;
	}

//	public Action getTargetAction() {
//		return targetAction;
//	}
	
}
