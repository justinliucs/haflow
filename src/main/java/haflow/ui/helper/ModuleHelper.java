package haflow.ui.helper;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.util.ModuleConfigurationComparator;
import haflow.module.util.ModuleEndpointComparator;
import haflow.module.util.ModuleLoader;
import haflow.ui.model.ModuleConfigurationModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleEndpointModel;
import haflow.ui.model.ModuleListModel;

import java.util.ArrayList;
import java.util.Arrays;
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
			ModuleConfiguration[] configurations = module.configurations();
			Arrays.sort(configurations, new ModuleConfigurationComparator());
			int i = 0;
			for (i = 0; i < configurations.length; i++) {
				ModuleConfigurationModel model = new ModuleConfigurationModel();
				model.setDisplayName(configurations[i].displayName());
				model.setKey(configurations[i].key());
				moduleBriefModel.getConfigurations().add(model);
			}
			ModuleEndpoint[] inputs = module.inputs();
			Arrays.sort(inputs, new ModuleEndpointComparator());
			for (i = 0; i < inputs.length; i++) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(inputs[i].maxNumber());
				model.setMinNumber(inputs[i].minNumber());
				model.setName(inputs[i].name());
				model.setDataType(inputs[i].dataType().toString());
				moduleBriefModel.getInputs().add(model);
			}
			ModuleEndpoint[] outputs = module.outputs();
			Arrays.sort(outputs, new ModuleEndpointComparator());
			for (i = 0; i < outputs.length; i++) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(outputs[i].maxNumber());
				model.setMinNumber(outputs[i].minNumber());
				model.setName(outputs[i].name());
				model.setDataType(outputs[i].dataType().toString());
				moduleBriefModel.getOutputs().add(model);
			}
			moduleListModel.getModules().add(moduleBriefModel);
		}
		return moduleListModel;
	}
}
