package haflow.ui.controller;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController {
	
	@RequestMapping({ "/cat" })
	public ModelAndView cat() {
		return new ModelAndView("cat");
	}
//	@RequestMapping({ "/oozie" })
//	public ModelAndView oozie() {
//		return new ModelAndView("oozie");
//	}

	@RequestMapping( value="/doCat",method = RequestMethod.POST )
	public ModelAndView doCat(@RequestParam String file) {
		ModelAndView mv=new ModelAndView("cat_res");
		
//System.err.println(file);

		StringBuilder sb=new StringBuilder();	
		BufferedReader reader=null;
		
		try {	
			reader=new BufferedReader(new FileReader(file));
			String line=null;
			while((line=reader.readLine())!=null){
				sb.append(line).append("\n");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			try {
				if(reader!=null)
					reader.close();
			} catch (IOException e) {
			}
		}
		
		mv.addObject("content",sb.toString());
		
		return mv;
	}
}
