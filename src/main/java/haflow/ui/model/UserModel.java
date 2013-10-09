package haflow.ui.model;

import java.util.Set;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
@XmlRootElement(name = "mainuser")
public class UserModel {
	private int id;
	private String name;
	private String password;
	private String email;
	private int role;
	//private String path;
	private double space;
	private double usedspace;
	private String realname;
	//private Set<FlowModel> flows;
	@XmlElement
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@XmlElement
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@XmlElement
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@XmlElement
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@XmlElement
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	/*@XmlElement
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}*/
	@XmlElement
	public double getSpace() {
		return space;
	}
	public void setSpace(double space) {
		this.space = space;
	}
	@XmlElement
	public double getUsedspace() {
		return usedspace;
	}
	public void setUsedspace(double usedspace) {
		this.usedspace = usedspace;
	}
	@XmlElement
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
//	@XmlElementWrapper(name = "flows")
//	@XmlElement(name = "flow")
//	public Set<FlowModel> getFlows() {
//		return flows;
//	}
//	public void setFlows(Set<FlowModel> flows) {
//		this.flows = flows;
//	}

}
