package haflow.ui.helper;

import haflow.entity.Configuration;
import haflow.entity.Module;
import haflow.service.ModuleService;
import haflow.ui.model.AddModuleModel;
import haflow.ui.model.AddModuleResultModel;
import haflow.ui.model.ConfigurationModel;
import haflow.ui.model.ModifyModuleModel;
import haflow.ui.model.ModifyModuleResultModel;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleListModel;
import haflow.ui.model.ModuleModel;
import haflow.ui.model.RemoveModuleModel;
import haflow.ui.model.RemoveModuleResultModel;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleHelper {
	private ModuleService moduleService;

	public ModuleService getModuleService() {
		return moduleService;
	}

	@Autowired
	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}

	public ModuleListModel getModuleList() {
		List<Module> moduleList = this.getModuleService().getModuleList();
		ModuleListModel moduleListModel = new ModuleListModel();
		moduleListModel.setModules(new ArrayList<ModuleBriefModel>());
		for (Module module : moduleList) {
			ModuleBriefModel moduleBriefModel = new ModuleBriefModel();
			moduleBriefModel.setId(module.getId());
			moduleBriefModel.setName(module.getName());
			moduleBriefModel
					.setConfigurations(new HashSet<ConfigurationModel>());
			for (Configuration configuration : module.getConfigurations()) {
				ConfigurationModel model = new ConfigurationModel();
				model.setDisplayName(configuration.getDisplayName());
				model.setId(configuration.getId());
				model.setKey(configuration.getKey());
				moduleBriefModel.getConfigurations().add(model);
			}
			moduleListModel.getModules().add(moduleBriefModel);
		}
		return moduleListModel;
	}

	public ModuleModel getModule(UUID moduleId) {
		Module module = this.getModuleService().getModule(moduleId);
		if (module == null) {
			return null;
		}
		ModuleModel moduleModel = new ModuleModel();
		moduleModel.setId(module.getId());
		moduleModel.setName(module.getName());
		moduleModel.setConfigurations(new HashSet<ConfigurationModel>());
		for (Configuration configuration : module.getConfigurations()) {
			ConfigurationModel model = new ConfigurationModel();
			model.setDisplayName(configuration.getDisplayName());
			model.setId(configuration.getId());
			model.setKey(configuration.getKey());
			moduleModel.getConfigurations().add(model);
		}
		return moduleModel;
	}

	public AddModuleResultModel addModule(AddModuleModel model) {
		String name = model.getName();
		Set<Configuration> configurations = new HashSet<Configuration>();
		for (ConfigurationModel configurationModel : model.getConfigurations()) {
			Configuration configuration = new Configuration();
			configuration.setId(configurationModel.getId());
			configuration.setDisplayName(configurationModel.getDisplayName());
			configuration.setKey(configurationModel.getKey());
			configurations.add(configuration);
		}
		UUID moduleId = this.getModuleService().addModule(name, configurations);
		if (moduleId == null) {
			AddModuleResultModel result = new AddModuleResultModel();
			result.setMessage("fail");
			result.setModuleId(null);
			result.setSuccess(false);
			return result;
		} else {
			AddModuleResultModel result = new AddModuleResultModel();
			result.setMessage("success");
			result.setModuleId(moduleId);
			result.setSuccess(true);
			return result;
		}
	}

	public ModifyModuleResultModel modifyModule(UUID moduleId,
			ModifyModuleModel model) {
		String newName = model.getNewName();
		Set<Configuration> newConfigurations = new HashSet<Configuration>();
		for (ConfigurationModel configurationModel : model
				.getNewConfigurations()) {
			Configuration configuration = new Configuration();
			configuration.setId(configurationModel.getId());
			configuration.setDisplayName(configurationModel.getDisplayName());
			configuration.setKey(configurationModel.getKey());
			newConfigurations.add(configuration);
		}
		boolean success = this.getModuleService().modifyModule(moduleId,
				newName, newConfigurations);
		ModifyModuleResultModel result = new ModifyModuleResultModel();
		result.setModuleId(moduleId);
		result.setSuccess(success);
		if (success) {
			result.setMessage("success");
		} else {
			result.setMessage("fail");
		}
		return result;
	}

	public RemoveModuleResultModel removeModule(UUID moduleId,
			RemoveModuleModel model) {
		boolean success = this.getModuleService().removeModule(moduleId);
		RemoveModuleResultModel result = new RemoveModuleResultModel();
		result.setModuleId(moduleId);
		result.setSuccess(success);
		if (success) {
			result.setMessage("success");
		} else {
			result.setMessage("fail");
		}
		return result;
	}
}
