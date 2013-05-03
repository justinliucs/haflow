package haflow.web.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/entry")
@SessionAttributes("entryBean")
public class EntryController {

	// Invoked on every request

	@ModelAttribute
	public void ajaxAttribute(WebRequest request, Model model) {
		model.addAttribute("ajaxRequest", AjaxUtils.isAjaxRequest(request));
	}

	// Invoked initially to create the "form" attribute
	// Once created the "form" attribute comes from the HTTP session (see @SessionAttributes)

	@ModelAttribute("entryBean")
	public EntryBean createEntryRecognizationBean() {
		return new EntryBean();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public void form() {
	}

	@RequestMapping(method=RequestMethod.POST)
	public String processSubmit(@Valid EntryBean entryBean, BindingResult result, 
								@ModelAttribute("ajaxRequest") boolean ajaxRequest, 
								Model model, RedirectAttributes redirectAttrs) {
		if (result.hasErrors()) {
			return null;
		}
		// Typically you would save to a db and clear the "form" attribute from the session 
		// via SessionStatus.setCompleted(). For the demo we leave it in the session.
		StringBuilder message = new StringBuilder("Form submitted successfully.  Execute " + entryBean + "\n");
		
		try {
			Process p = Runtime.getRuntime().exec(entryBean.toString());
			p.waitFor();
			BufferedReader reader = new BufferedReader(new InputStreamReader(p
					.getErrorStream()));
			String line = reader.readLine();
			if( line != null)
				message.append("Execute Error Log: \n");
			while (line != null) {
				message.append(line);
				line = reader.readLine();
			}
			reader.close();
			
			BufferedReader reader2 = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line2 = reader2.readLine();
			if( line2 != null)
				message.append("Execute Log: \n");
			while (line2 != null) {
				message.append(line2);
				line2 = reader2.readLine();
			}
			reader2.close();
		} catch (IOException e1) {
			e1.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		message.append("\nDone!\n");
		
		// Success response handling
		if (ajaxRequest) {
			// prepare model for rendering success message in this request
			model.addAttribute("message", message.toString());
			return null;
		} else {
			// store a success message for rendering on the next request after redirect
			// redirect back to the form to render the success message along with newly bound values
			redirectAttrs.addFlashAttribute("message", message.toString());
			return "redirect:/entry";			
		}
	}
	
}
