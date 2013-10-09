package haflow.ui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@RequestMapping("/")
	public ModelAndView logon() {

		return new ModelAndView("logon");
	}

	
	
//	@RequestMapping("/main")
//	public ModelAndView main() {
//		return new ModelAndView("main");
//	}
//
//	@RequestMapping("/admin")
//	public ModelAndView admin() {
//		return new ModelAndView("admin");
//	}
	
	@RequestMapping({ "/oozie" })
	public ModelAndView oozie() {
		return new ModelAndView("oozie");
	}
}
