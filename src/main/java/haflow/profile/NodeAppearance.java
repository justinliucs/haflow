package haflow.profile;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "nodeAppearance")
public class NodeAppearance {
	private UUID id;
	private UUID nodeId;
	private int positionLeft;
	private int positionTop;

	@Id
	@Column(name = "id", length = 16)
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@Column(name = "nodeId", length = 16, unique = true)
	public UUID getNodeId() {
		return nodeId;
	}

	public void setNodeId(UUID nodeId) {
		this.nodeId = nodeId;
	}

	@Column(name = "positionLeft")
	public int getPositionLeft() {
		return positionLeft;
	}

	public void setPositionLeft(int positionLeft) {
		this.positionLeft = positionLeft;
	}

	@Column(name = "positionTop")
	public int getPositionTop() {
		return positionTop;
	}

	public void setPositionTop(int positionTop) {
		this.positionTop = positionTop;
	}

}
