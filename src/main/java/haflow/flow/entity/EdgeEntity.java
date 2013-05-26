package haflow.flow.entity;

import java.util.UUID;

public class EdgeEntity {
	private UUID id;
	private UUID flowId;
	private UUID sourceNodeId;
	private UUID targetNodeId;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getFlowId() {
		return flowId;
	}

	public void setFlowId(UUID flowId) {
		this.flowId = flowId;
	}

	public UUID getSourceNodeId() {
		return sourceNodeId;
	}

	public void setSourceNodeId(UUID sourceNodeId) {
		this.sourceNodeId = sourceNodeId;
	}

	public UUID getTargetNodeId() {
		return targetNodeId;
	}

	public void setTargetNodeId(UUID targetNodeId) {
		this.targetNodeId = targetNodeId;
	}

}
