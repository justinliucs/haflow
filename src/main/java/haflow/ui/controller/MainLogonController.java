package haflow.ui.controller;


import haflow.ui.helper.UserHelper;
import haflow.util.ClusterConfiguration;
import haflow.util.Md5Util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainLogonController {
	private UserHelper userHelper;

	private UserHelper getUserHelper() {
		return userHelper;
	}

	@Autowired
	private void setLogonHelper(UserHelper userHelper) {
		this.userHelper = userHelper;
	}

	private ClusterConfiguration clusterConfiguration;

	@Autowired
	private void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}
	
	@RequestMapping(value="/registration")
	public ModelAndView toRegister() {
		return new ModelAndView("registration");
	}

	@RequestMapping(value = "/regiscommit", method = RequestMethod.POST)
	public String register(RedirectAttributes redirectAttributes,
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("email") String email,@RequestParam("mora") String mora) {
		
		password=Md5Util.getMd5Hex(password);
		if (this.getUserHelper().saveUser(username, password, email, mora)) {
			redirectAttributes.addFlashAttribute("message",
					"successfully registed!");
			return "redirect:/";
		} else {
			redirectAttributes.addFlashAttribute("message",
					"user name or email already exist!");
			return "redirect:/registration";
		}
	}
	@RequestMapping(value="/quit")
	public String quit(RedirectAttributes redirectAttributes,HttpServletRequest request){
		request.getSession().setAttribute("username",null);
		request.getSession().setAttribute("userid",null);
		request.getSession().setAttribute("scope", null);
		return "redirect:/";
	}

	
	@RequestMapping(value = "/logon", method = RequestMethod.POST)
	public String login(RedirectAttributes redirectAttributes,
			HttpServletRequest request,
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("language") String language) {
		
		if (username == "" || password == "") {
			redirectAttributes.addFlashAttribute("message", "username or password is empty!");
			return "redirect:/";
		}
		password=Md5Util.getMd5Hex(password);
		int userid=this.getUserHelper().validate(username, password, "main");
		
		if (userid!=-1) {
			request.getSession().setAttribute("userid", userid);
			request.getSession().setAttribute("username", username);
			request.getSession().setAttribute("hdfsrootpath", 
					this.clusterConfiguration.getProperty(ClusterConfiguration.USER_HDFS_ROOT_PATH));
			request.getSession().setAttribute("scope", 0);
			if(language.equals("English")||language.equals("english"))
				return "redirect:/main";
			else
				return "redirect:/zh";
		} else {
			redirectAttributes.addFlashAttribute("message","invalid username or password!");
			return "redirect:/";
		}
	}

	@RequestMapping(value = "/main")
	public ModelAndView post(HttpServletRequest request) {
		
			ModelAndView main=new ModelAndView("main");
			main.addObject("username", request.getSession().getAttribute("username"));
			return main;
		
		
	}
	
	@RequestMapping(value = "/zh")
	public ModelAndView changetozh(HttpServletRequest request) {
		//System.out.println("main enter!!!!!");
			ModelAndView main=new ModelAndView("zh");
			main.addObject("username", request.getSession().getAttribute("username"));
			return main;
	}
	
}
