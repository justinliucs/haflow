package haflow.flow.controller;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@XmlRootElement
public class ErModule {
	private String id;
	private String name;
	private String type;
	private ArrayList<ErProperties> properties=new ArrayList<ErProperties>();
	private ArrayList<Position> position=new ArrayList<Position>();
	
	@XmlElement
	public String getId() {
		return id;
	}
	public void setId(String id) {
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	@XmlElements( { @XmlElement(name = "erProperties", type = ErProperties.class) }) 
	public ArrayList<ErProperties> getProperties() {
		return properties;
	}
	public void setProperties(ArrayList<ErProperties> properties) {
		this.properties = properties;
	}
	
	@XmlElements({ @XmlElement(name = "position", type = Position.class)  })
	public ArrayList<Position> getPosition() {
		return position;
	}
	public void setPosition(ArrayList<Position> position) {
		this.position = position;
	}
	@JsonIgnore
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("id:" + id + "; " + "name:" + name + "; " + "type:" + type+ ";\n");
		for(ErProperties p : properties){
			sb.append(p.toString() + "\n");
		}
		for(Position p: position){
			sb.append(p.toString() + "\n");
		}
		return sb.toString();
	}
	
}
