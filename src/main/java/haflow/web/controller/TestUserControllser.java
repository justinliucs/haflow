package haflow.web.controller;


import haflow.web.model.User;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/UserTest")
public class TestUserControllser {
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody User getShopInJSON() {

		User user = new User();
		user.setName("liqiyuan");
		user.setPassword("123456");
		user.setSex("female");
		return user;

	}
}
