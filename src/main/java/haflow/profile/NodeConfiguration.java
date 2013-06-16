package haflow.profile;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "nodeConfiguration")
public class NodeConfiguration {
	private UUID id;
	private UUID nodeId;
	private String key;
	private String value;

	@Id
	@Column(name = "id", length = 16)
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@Column(name = "nodeId", length = 16)
	public UUID getNodeId() {
		return nodeId;
	}

	public void setNodeId(UUID nodeId) {
		this.nodeId = nodeId;
	}

	@Column(name = "configurationKey")
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	@Column(name = "configurationValue")
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
