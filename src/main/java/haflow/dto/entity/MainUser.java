package haflow.dto.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "mainuser")
public class MainUser {
	private int id;
	private String name;
	private String password;
	private String email;
	private int role;
	private String path;
	private double space;
	private double usedspace;
	private String realname;
	private Set<Flow> flows;
	private Set<Report> reports;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "name", unique = true, nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "password", nullable = false)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "email", unique = true, nullable = false)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "role", nullable = false)
	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	@Column(name = "path", nullable = false)
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	@Column(name = "space", nullable = false)
	public double getSpace() {
		return space;
	}

	public void setSpace(double space2) {
		this.space = space2;
	}

	@Column(name = "usedspace")
	public double getUsedspace() {
		return usedspace;
	}

	public void setUsedspace(double d) {
		this.usedspace = d;
	}

	@Column(name = "realname")
	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Flow> getFlows() {
		return flows;
	}

	public void setFlows(Set<Flow> flows) {
		this.flows = flows;
	}

	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<Report> getReports() {
		return reports;
	}

	public void setReports(Set<Report> reports) {
		this.reports = reports;
	}

}
