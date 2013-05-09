package haflow.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/run1")
public class RunController1 {

	@RequestMapping(method = RequestMethod.POST)
	public String run(Model model) {
		model.addAttribute("message1", "Finished Message! 1");
		return "demo";

	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String run2(Model model) {
		model.addAttribute("message1", "Finished Message! 2");
		return "demo";

	}
}
