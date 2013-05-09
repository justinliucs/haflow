package haflow.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/run")
public class RunController {

	@RequestMapping(method = RequestMethod.GET)
	public String run(Model model) {
		model.addAttribute("message", "Finished Message!");
		return "demo";

	}
}
