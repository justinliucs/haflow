package haflow.dto.entity;

import java.util.Set;
import java.util.UUID;

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
@Table( name="report")
public class Report {

	private UUID id;
	private String name;
	private Report parent;
	private boolean isDirectory;
	private Set<Portlet> portlets;
	private MainUser user;
	private Set<Report> children;
	
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
	
	@ManyToOne
	@JoinColumn(name="parentId", referencedColumnName="id")
	public Report getParent() {
		return parent;
	}
	public void setParent(Report parent) {
		this.parent = parent;
	}
	
	@Column(name="isDirectory")
	public boolean isDirectory() {
		return isDirectory;
	}
	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}
	
	@OneToMany(mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Portlet> getPortlets() {
		return portlets;
	}
	public void setPortlets(Set<Portlet> portlets) {
		this.portlets = portlets;
	}
	
	@ManyToOne
	@JoinColumn(name="ownerId",referencedColumnName="id")
	public MainUser getUser() {
		return user;
	}
	public void setUser(MainUser user) {
		this.user = user;
	}

	@OneToMany(mappedBy="parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Report> getChildren() {
		return children;
	}

	public void setChildren(Set<Report> children) {
		this.children = children;
	}
	
}
