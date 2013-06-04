package haflow.ui.helper;

import haflow.entity.ModuleConfiguration;
import haflow.entity.Module;
import haflow.ui.model.ConfigurationModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleListModel;
import haflow.utility.ModuleLoader;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleHelper {
	private ModuleLoader moduleLoader;

	public ModuleLoader getModuleLoader() {
		return moduleLoader;
	}

	@Autowired
	public void setModuleLoader(ModuleLoader moduleLoader) {
		this.moduleLoader = moduleLoader;
	}

	public ModuleListModel getModuleList() {
		Set<Module> moduleList = this.getModuleLoader().searchForModules()
				.keySet();
		ModuleListModel moduleListModel = new ModuleListModel();
		moduleListModel.setModules(new ArrayList<ModuleBriefModel>());
		for (Module module : moduleList) {
			ModuleBriefModel moduleBriefModel = new ModuleBriefModel();
			moduleBriefModel.setId(module.getId());
			moduleBriefModel.setName(module.getName());
			moduleBriefModel.setCategory(module.getCategory());
			moduleBriefModel
					.setConfigurations(new HashSet<ConfigurationModel>());
			for (ModuleConfiguration configuration : module.getConfigurations()) {
				ConfigurationModel model = new ConfigurationModel();
				model.setDisplayName(configuration.getDisplayName());
				model.setKey(configuration.getKey());
				moduleBriefModel.getConfigurations().add(model);
			}
			moduleListModel.getModules().add(moduleBriefModel);
		}
		return moduleListModel;
	}
	
	public Map<String, Class<?>> getModuleClasses() {
		Map<String, Class<?>>  moduleClasses = this.getModuleLoader().searchForModuleClasses();

		return moduleClasses;
	}
}
