package haflow.web.model;

import java.util.ArrayList;
import java.util.LinkedList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
//@JsonIgnoreProperties (value = { "itemsList" })  
@XmlRootElement
public class ProcessJson {
	private String identifier;
	private String label;
	private ArrayList<ProcessParentItem> items=new ArrayList<ProcessParentItem>();
	public ProcessJson(){}
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
	  @XmlElementWrapper(name = "items")
		@XmlElement(name = "processParentItem")
	public ArrayList<ProcessParentItem> getItems() {
		return items;
	}
	
	@JsonIgnore
	public boolean addItem(ProcessParentItem item)
	{
		return items.add(item);
	}
	
	@JsonIgnore
	public boolean removeItem(ProcessParentItem item)
	{
		for(ProcessParentItem i:items)
		{
			if(i.getId().equals(item.getId()))
				return items.remove(i);
		}
		return false;
	}
	
}
