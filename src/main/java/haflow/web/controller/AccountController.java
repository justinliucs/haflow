package haflow.web.controller;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/account")
public class AccountController {
	
	private Map<Long, Account> accounts = new ConcurrentHashMap<Long, Account>();
	
	
	@RequestMapping(method=RequestMethod.GET)
	public String getCreateForm(Model model) {
		model.addAttribute(new Account());
		return "account/createForm";
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public @ResponseBody Map<String, ? extends Object> create(@RequestBody Account account, HttpServletResponse response) {
		accounts.put(account.assignId(), account);
		return Collections.singletonMap("id", account.getId());
	}
	
	@RequestMapping(value="{id}", method=RequestMethod.GET)
	public @ResponseBody Account get(@PathVariable Long id) {
		Account account = accounts.get(id);

		return account;
	}
	
}
