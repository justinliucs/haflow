package haflow.ui.controller;


import javax.servlet.http.HttpServletRequest;

import haflow.module.util.Md5Util;
import haflow.ui.helper.HdfsHelper;
import haflow.ui.helper.UserHelper;

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
	private HdfsHelper hdfsHelper;

	private HdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}
	
	@Autowired
	private void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}
	private UserHelper getUserHelper() {
		return userHelper;
	}

	@Autowired
	private void setLogonHelper(UserHelper userHelper) {
		this.userHelper = userHelper;
	}

	@RequestMapping("registration")
	public ModelAndView toRegister() {
		return new ModelAndView("registration");
	}

	@RequestMapping(value = "/regiscommit", method = RequestMethod.POST)
	public String register(RedirectAttributes redirectAttributes,
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("email") String email,@RequestParam("mora") String mora) {
		
		password=Md5Util.getMd5Hex(password);
		if (this.getUserHelper().saveUser(username, password,email, mora)) {
			//System.out.println("successful return main");
//			System.out
//					.println("controller:"+(this.getHdfsHelper()==null));
			if(this.getHdfsHelper().createdirectory("hdfs://133.133.2.150:9000/user/root",username))
			{
			redirectAttributes.addFlashAttribute("message", "注册成功");
			return "redirect:/";
			}
			else{
				redirectAttributes.addFlashAttribute("message", "用户hdfs空间未分配成功！");
				return "redirect:/registration";
			}

		} else {
			redirectAttributes.addFlashAttribute("message", "用户名或邮箱已存在");
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
			@RequestParam("password") String password) {
		
		if (username == "" || password == "") {
			redirectAttributes.addFlashAttribute("message", "请填写用户名密码");
			return "redirect:/";
		}
		password=Md5Util.getMd5Hex(password);
		int userid=this.getUserHelper().validate(username, password, "main");
		if (userid!=-1) {
			//System.out.println("logon enter!!!!!!");
			request.getSession().setAttribute("userid", userid);
			request.getSession().setAttribute("username", username);
			request.getSession().setAttribute("scope", 0);
			
			return "redirect:/main";

		} else {
			//System.out.println("logon failed!!!!!!");
			redirectAttributes.addFlashAttribute("message","用户名密码错误");
			return "redirect:/";
		}
	}

	@RequestMapping(value = "/main")
	public ModelAndView post(HttpServletRequest request) {
		//System.out.println("main enter!!!!!");
		boolean flag = UserHelper.isUserLogon(request,0);
		if(flag){
			ModelAndView main=new ModelAndView("main");
			main.addObject("username", request.getSession().getAttribute("username"));
			return main;
		}
		else{
			ModelAndView mav=new ModelAndView("logon");
			mav.addObject("message","请填写用户名和密码！");
			return mav;
		}
	}
	
}