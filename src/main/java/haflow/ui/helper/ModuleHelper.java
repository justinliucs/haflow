package haflow.ui.helper;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.util.ModuleUtil;
import haflow.ui.model.ModuleConfigurationModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleEndpointModel;
import haflow.ui.model.ModuleListModel;

import java.util.ArrayList;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleHelper {
	private static ModuleHelper moduleHelper;
	private ModuleUtil moduleUtil;

	public static ModuleHelper getModuleHelper() {
		return moduleHelper;
	}

	private static void setModuleHelper(ModuleHelper moduleHelper) {
		ModuleHelper.moduleHelper = moduleHelper;
	}

	private ModuleUtil getModuleUtil() {
		return moduleUtil;
	}

	@Autowired
	private void setModuleUtil(ModuleUtil moduleUtil) {
		this.moduleUtil = moduleUtil;
	}

	public ModuleHelper() {
		ModuleHelper.setModuleHelper(this);
	}

	public boolean removeModule(UUID moduleId) {
		return this.getModuleUtil().removeModule(moduleId);
	}

	public ModuleListModel getModuleList() {
		Set<Module> moduleList = this.getModuleUtil().searchForModules()
				.keySet();
		ModuleListModel moduleListModel = new ModuleListModel();
		moduleListModel.setModules(new ArrayList<ModuleBriefModel>());
		for (Module module : moduleList) {
			ModuleBriefModel moduleBriefModel = new ModuleBriefModel();
			moduleBriefModel.setId(UUID.fromString(module.id()));
			moduleBriefModel.setName(module.name());
			moduleBriefModel.setCategory(module.category());
			moduleBriefModel
					.setConfigurations(new ArrayList<ModuleConfigurationModel>());
			moduleBriefModel.setInputs(new ArrayList<ModuleEndpointModel>());
			moduleBriefModel.setOutputs(new ArrayList<ModuleEndpointModel>());
			ModuleConfiguration[] configurations = module.configurations();
			int i = 0;
			for (i = 0; i < configurations.length; i++) {
				ModuleConfigurationModel model = new ModuleConfigurationModel();
				model.setDisplayName(configurations[i].displayName());
				model.setKey(configurations[i].key());
				model.setPattern(configurations[i].pattern());
				model.setType(configurations[i].type());
				moduleBriefModel.getConfigurations().add(model);
			}
			ModuleEndpoint[] inputs = module.inputs();
			for (i = 0; i < inputs.length; i++) {
				ModuleEndpointModel model = new ModuleEndpointModel();
				model.setMaxNumber(inputs[i].maxNumber());
				model.setMinNumber(inputs[i].minNumber());
				model.setName(inputs[i].name());
				model.setDataType(inputs[i].dataType().toString());
				moduleBriefModel.getInputs().add(model);
			}
			ModuleEndpoint[] outputs = module.outputs();
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
