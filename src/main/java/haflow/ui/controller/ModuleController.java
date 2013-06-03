package haflow.ui.controller;

import haflow.ui.helper.ModuleHelper;
import haflow.ui.model.ModuleListModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
}
