package haflow.ui.controller;

import haflow.ui.helper.ModuleHelper;
import haflow.ui.model.AddModuleModel;
import haflow.ui.model.AddModuleResultModel;
import haflow.ui.model.ModifyModuleModel;
import haflow.ui.model.ModifyModuleResultModel;
import haflow.ui.model.ModuleListModel;
import haflow.ui.model.ModuleModel;
import haflow.ui.model.RemoveModuleModel;
import haflow.ui.model.RemoveModuleResultModel;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/module")
public class ModuleController {
	private ModuleHelper moduleHelper;

	public ModuleHelper getModuleHelper() {
		return moduleHelper;
	}

	@Autowired
	public void setModuleHelper(ModuleHelper moduleHelper) {
		this.moduleHelper = moduleHelper;
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ModuleListModel get() {
		return this.getModuleHelper().getModuleList();
	}

	@RequestMapping(value = "/{moduleId}", method = RequestMethod.GET)
	@ResponseBody
	public ModuleModel get(@PathVariable UUID moduleId) {
		return this.getModuleHelper().getModule(moduleId);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public AddModuleResultModel post(@RequestBody AddModuleModel model) {
		return this.getModuleHelper().addModule(model);
	}

	@RequestMapping(value = "/{moduleId}", method = RequestMethod.PUT)
	@ResponseBody
	public ModifyModuleResultModel put(@PathVariable UUID moduleId,
			@RequestBody ModifyModuleModel model) {
		return this.getModuleHelper().modifyModule(moduleId, model);
	}

	@RequestMapping(value = "/{moduleId}", method = RequestMethod.DELETE)
	@ResponseBody
	public RemoveModuleResultModel delete(@PathVariable UUID moduleId,
			@RequestBody RemoveModuleModel model) {
		return this.getModuleHelper().removeModule(moduleId, model);
	}
}
