package haflow.ui.helper;

import haflow.entity.ModuleConfiguration;
import haflow.entity.Module;
import haflow.entity.ModuleEndpoint;
import haflow.ui.model.ModuleConfigurationModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleEndpointModel;
import haflow.ui.model.ModuleListModel;
import haflow.utility.ModuleLoader;

import java.util.ArrayList;
import java.util.HashSet;
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
					.setConfigurations(new HashSet<ModuleConfigurationModel>());
			moduleBriefModel.setInputs(new HashSet<ModuleEndpointModel>());
			moduleBriefModel.setOutputs(new HashSet<ModuleEndpointModel>());
			for (ModuleConfiguration configuration : module.getConfigurations()) {
				ModuleConfigurationModel model = new ModuleConfigurationModel();
				model.setDisplayName(configuration.getDisplayName());
				model.setKey(configuration.getKey());
				moduleBriefModel.getConfigurations().add(model);
			}
			for (ModuleEndpoint input : module.getInputs()) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(input.getMaxNumber());
				model.setMinNumber(input.getMinNumber());
				model.setName(input.getName());
				moduleBriefModel.getInputs().add(model);
			}
			for (ModuleEndpoint output : module.getOutputs()) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(output.getMaxNumber());
				model.setMinNumber(output.getMinNumber());
				model.setName(output.getName());
				moduleBriefModel.getOutputs().add(model);
			}
			moduleListModel.getModules().add(moduleBriefModel);
		}
		return moduleListModel;
	}
}
