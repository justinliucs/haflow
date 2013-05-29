package haflow.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
	@RequestMapping({ "/", "/home/index" })
	public ModelAndView index() {
		return new ModelAndView("main");
	}
}
