package haflow.ui.controller;

import java.io.UnsupportedEncodingException;

import haflow.ui.helper.CatHdfsHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestHdfsController {
	private CatHdfsHelper hdfsHelper;

	private CatHdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}

	@Autowired
	private void setHdfsHelper(CatHdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	@RequestMapping(value = "/cat_file", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView get(
			@RequestParam(value = "path", required = true) String path) {
		String in_path=path;
		try {
			String out_path = new String(in_path.getBytes("iso-8859-1"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ModelAndView mv=new ModelAndView("cat_hdfs");
		mv.addObject("content",this.getHdfsHelper().getFile(path).getContent());
		return mv;
//		return this.getHdfsHelper().getFile(path).getContent();
	}
}
