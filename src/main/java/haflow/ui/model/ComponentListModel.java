package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "componentList")
public class ComponentListModel {
	private List<ComponentBriefModel> components;

	@XmlElementWrapper(name = "components")
	@XmlElement(name = "component")
	public List<ComponentBriefModel> getComponents() {
		return components;
	}

	public void setComponents(List<ComponentBriefModel> components) {
		this.components = components;
	}

}
