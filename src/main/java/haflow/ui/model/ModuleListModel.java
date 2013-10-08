package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "moduleList")
public class ModuleListModel {
	private List<ModuleBriefModel> modules;

	@XmlElementWrapper(name = "modules")
	@XmlElement(name = "module")
	public List<ModuleBriefModel> getModules() {
		return modules;
	}

	public void setModules(List<ModuleBriefModel> modules) {
		this.modules = modules;
	}

}
