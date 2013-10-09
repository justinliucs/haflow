package haflow.ui.controller;

import javax.servlet.http.HttpServletRequest;

import haflow.ui.helper.UserHelper;
import haflow.ui.model.SaveUserResultModel;
import haflow.ui.model.UserModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/user")
public class UserController {
	private UserHelper userHelper;

	public UserHelper getUserHelper() {
		return userHelper;
	}


	@Autowired
	public void setUserHelper(UserHelper userHelper) {
		this.userHelper = userHelper;
	}
	
	@RequestMapping(value = "/get/{userid}", method = RequestMethod.GET)
	@ResponseBody
	public UserModel get(@PathVariable int userid,HttpServletRequest request){
		
		boolean flag=UserHelper.isUserLogon(request, 0);
		
		if(flag){
			
			return this.getUserHelper().getUser(userid);
				
			}
		return null;
	
	}
	@RequestMapping(value = "/update/{userid}", method = RequestMethod.POST)
	@ResponseBody
	public SaveUserResultModel post(@PathVariable int userid,@RequestBody UserModel user,HttpServletRequest request){
		System.out.println(userid);
		System.out.println("!!!!!!!!!!!success update");
		boolean flag=UserHelper.isUserLogon(request, 0);
		
		if(flag){
			
			return this.getUserHelper().updateUser(userid,user);
				
			}
		return null;
	
	}
	@RequestMapping(value = "/remove/{userid}", method = RequestMethod.GET)
	public String delete(@PathVariable int userid,HttpServletRequest request,RedirectAttributes redirectAttributes){
		boolean flag=UserHelper.isUserLogon(request, 1);
		
		if(flag){
			
			if(this.getUserHelper().deleteUser(userid)){
				redirectAttributes.addFlashAttribute("message", "success removed a user!");
				return "redirect:/adminhome";
//				 mav.addObject("message", "success!");
//				 return mav;
			}
		}
		redirectAttributes.addFlashAttribute("message", "failed removed a user!");
		return "redirect:/adminhome";
//		mav.addObject("message", "failed!");
//		return mav;
	}

}
