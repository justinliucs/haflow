package haflow.dto.entity;

import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Cascade;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "flow")
public class Flow {
	private UUID id;
	private String name;
	private Set<Node> nodes;
	private Set<Edge> edges;
	private MainUser user;
	private Set<FlowRunHistory> exeHistory;

	@Id
	@Column(name = "id", length = 16)
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@OneToMany(mappedBy = "flow", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Node> getNodes() {
		return nodes;
	}

	public void setNodes(Set<Node> nodes) {
		this.nodes = nodes;
	}

	@OneToMany(mappedBy = "flow", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Edge> getEdges() {
		return edges;
	}

	public void setEdges(Set<Edge> edges) {
		this.edges = edges;
	}
	
	@OneToMany(mappedBy = "flow", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<FlowRunHistory> getExeHistory() {
		return exeHistory;
	}

	public void setExeHistory(Set<FlowRunHistory> exeHistory) {
		this.exeHistory = exeHistory;
	}
	
	@ManyToOne
	@JoinColumn(name="mainuser_id",referencedColumnName="id")
	public MainUser getUser() {
		return user;
	}

	public void setUser(MainUser user) {
		this.user = user;
	}
}
