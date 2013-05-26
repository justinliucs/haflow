package haflow.ui.model;

import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "edge")
public class EdgeModel {
	private UUID id;
	private UUID flowId;
	private UUID sourceNodeId;
	private UUID targetNodeId;

	@XmlElement
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@XmlElement
	public UUID getFlowId() {
		return flowId;
	}

	public void setFlowId(UUID flowId) {
		this.flowId = flowId;
	}

	@XmlElement
	public UUID getSourceNodeId() {
		return sourceNodeId;
	}

	public void setSourceNodeId(UUID sourceNodeId) {
		this.sourceNodeId = sourceNodeId;
	}

	@XmlElement
	public UUID getTargetNodeId() {
		return targetNodeId;
	}

	public void setTargetNodeId(UUID targetNodeId) {
		this.targetNodeId = targetNodeId;
	}

}
