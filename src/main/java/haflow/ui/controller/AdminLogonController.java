package haflow.ui.controller;


import javax.servlet.http.HttpServletRequest;

import haflow.module.util.Md5Util;
import haflow.ui.helper.UserHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller

public class AdminLogonController {
	private UserHelper userHelper;

	private UserHelper getUserHelper() {
		return userHelper;
	}

	@Autowired
	private void setLogonHelper(UserHelper logonHelper) {
		this.userHelper = logonHelper;
	}
	@RequestMapping(value="/admin")
	public ModelAndView admin(HttpServletRequest request){
		
		if(UserHelper.isUserLogon(request,1))
			return new ModelAndView("admin");
		else
			return new ModelAndView("logon");
	}
	/*@RequestMapping(value="/adminusermana")
	public ModelAndView adminmana(HttpServletRequest request){
		
		if(UserHelper.isUserLogon(request,1)){
			List<MainUser> list=this.getUserHelper().getAllUser();
			request.setAttribute("list", list);
			return new ModelAndView("adminusermana");
		}
			
		else
			return new ModelAndView("logon");
	}*/
	@RequestMapping(value="/adminhome")
	public ModelAndView aminhome(HttpServletRequest request){
		if(UserHelper.isUserLogon(request,1))
			return new ModelAndView("adminhome");
		else
			return new ModelAndView("logon");
	}
	@RequestMapping(value="/adminlogon", method = RequestMethod.POST)
	public String post(RedirectAttributes redirectAttributes,HttpServletRequest request,@RequestParam("username") String username,@RequestParam("password") String password) {
		
		if(username==""||password==""){
			redirectAttributes.addFlashAttribute("message", "请填写用户名密码");
			return "redirect:/";
		}
		password=Md5Util.getMd5Hex(password);
		int userid=this.getUserHelper().validate(username, password, "admin");
		if(userid!=-1){
			System.out.println("admin logon");
			request.getSession().setAttribute("username", username);
			request.getSession().setAttribute("userid", userid);
			request.getSession().setAttribute("scope", 1);
			return "redirect:/adminhome";
		}
		else{
			redirectAttributes.addFlashAttribute("message","用户名密码错误");
			return "redirect:/";
		}
		
			
		}
	@RequestMapping(value="/hadoop_administration")
	public ModelAndView hadoopAdmin(HttpServletRequest request){
		return new ModelAndView("hadoop-administration");
	}
	
	@RequestMapping(value="/namenode_administration")
	public ModelAndView namenodeAdmin(HttpServletRequest request){
		return new ModelAndView("namenode-administration");
	}
}