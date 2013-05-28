package haflow.entity;

import haflow.profile.ui.NodeProfile;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "node")
public class Node {
	private UUID id;
	private Flow flow;
	private Module module;
	private String name;

	private NodeProfile nodeProfile;

	@Id
	@Column(name = "id", length = 16)
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name = "flowId")
	public Flow getFlow() {
		return flow;
	}

	public void setFlow(Flow flow) {
		this.flow = flow;
	}

	@ManyToOne
	@JoinColumn(name = "moduleId")
	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@OneToOne(mappedBy = "node", orphanRemoval = true)
	public NodeProfile getNodeProfile() {
		return nodeProfile;
	}

	public void setNodeProfile(NodeProfile nodeProfile) {
		this.nodeProfile = nodeProfile;
	}

}
