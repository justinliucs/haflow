package haflow.ui.controller;

import haflow.ui.model.ComponentBriefModel;
import haflow.ui.model.ComponentListModel;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/component")
public class ComponentController {
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ComponentListModel get() {
		List<ComponentBriefModel> ret = new ArrayList<ComponentBriefModel>();
		ComponentBriefModel component1 = new ComponentBriefModel();
		component1.setId(UUID
				.fromString("2f30e2a9-6d97-0d2f-4a10-a3250812ab8e"));
		component1.setName("Component 1");
		ret.add(component1);
		ComponentListModel list = new ComponentListModel();
		list.setComponents(ret);
		return list;
	}
}
