package haflow.flow.controller;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@XmlRootElement
public class FlowJson {
	private String identifier;
	private String label;
	private ArrayList<ErModule> erModules=new ArrayList<ErModule>();
	public FlowJson(){}
	
	@JsonIgnore
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("identifier:" + identifier + "; " + "label:"+label + "; \n");
		for(ErModule module : erModules){
			sb.append(module.toString() + "\n");
		}
		return sb.toString();
	}
	
	@XmlElement
	public String getIdentifier() {
		return identifier;
	}
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	@XmlElement
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	
	@XmlElementWrapper(name = "erModules")
	@XmlElement(name = "erModule")
	public ArrayList<ErModule> getErModule() {
		return erModules;
	}
	
	@JsonIgnore
	public boolean addItem(ErModule module)
	{
		return erModules.add(module);
	}
	
	@JsonIgnore
	public boolean removeItem(ErModule module)
	{
		for(ErModule i : erModules)
		{
			if(i.getId().equals(module.getId()))
				return erModules.remove(i);
		}
		return false;
	}
	

}
