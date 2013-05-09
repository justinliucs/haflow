package haflow.web.model;

import java.util.ArrayList;
import java.util.LinkedList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;
@XmlRootElement
@JsonSerialize(include=JsonSerialize.Inclusion.NON_DEFAULT)
public class ProcessParentItem {
	
	private String id;
	private String name;
	private String type;
	private ArrayList<ProcessChildren> children=new ArrayList<ProcessChildren>();
	public ProcessParentItem(){}
	
	public ProcessParentItem(String id, String name, String type) {
		
		this.id = id;
		this.name = name;
		this.type = type;
	}
    

	@XmlElementWrapper(name = "children")
	@XmlElement(name = "processChildren")
	public ArrayList<ProcessChildren> getChildren() {
		return children;
	}
	@JsonIgnore
    public void addChild(ProcessChildren child)
    {
    	children.add(child);
    }

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	

}
