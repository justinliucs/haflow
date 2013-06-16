package haflow.ui.helper;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.ui.model.ModuleConfigurationModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleEndpointModel;
import haflow.ui.model.ModuleListModel;
import haflow.utility.ModuleLoader;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleHelper {
	private ModuleLoader moduleLoader;

	private ModuleLoader getModuleLoader() {
		return moduleLoader;
	}

	@Autowired
	private void setModuleLoader(ModuleLoader moduleLoader) {
		this.moduleLoader = moduleLoader;
	}

	public ModuleListModel getModuleList() {
		Set<Module> moduleList = this.getModuleLoader().searchForModules()
				.keySet();
		ModuleListModel moduleListModel = new ModuleListModel();
		moduleListModel.setModules(new ArrayList<ModuleBriefModel>());
		for (Module module : moduleList) {
			ModuleBriefModel moduleBriefModel = new ModuleBriefModel();
			moduleBriefModel.setId(UUID.fromString(module.id()));
			moduleBriefModel.setName(module.name());
			moduleBriefModel.setCategory(module.category());
			moduleBriefModel
					.setConfigurations(new HashSet<ModuleConfigurationModel>());
			moduleBriefModel.setInputs(new HashSet<ModuleEndpointModel>());
			moduleBriefModel.setOutputs(new HashSet<ModuleEndpointModel>());
			for (ModuleConfiguration configuration : module.configurations()) {
				ModuleConfigurationModel model = new ModuleConfigurationModel();
				model.setDisplayName(configuration.displayName());
				model.setKey(configuration.key());
				moduleBriefModel.getConfigurations().add(model);
			}
			for (ModuleEndpoint input : module.inputs()) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(input.maxNumber());
				model.setMinNumber(input.minNumber());
				model.setName(input.name());
				moduleBriefModel.getInputs().add(model);
			}
			for (ModuleEndpoint output : module.outputs()) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(output.maxNumber());
				model.setMinNumber(output.minNumber());
				model.setName(output.name());
				moduleBriefModel.getOutputs().add(model);
			}
			moduleListModel.getModules().add(moduleBriefModel);
		}
		return moduleListModel;
	}
}
