package haflow.profile.ui;

import haflow.entity.Node;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "nodeProfile")
public class NodeProfile {
	private UUID id;
	private Node node;
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

	@ManyToOne
	@JoinColumn(name = "nodeId")
	public Node getNode() {
		return node;
	}

	public void setNode(Node node) {
		this.node = node;
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
