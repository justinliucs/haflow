package haflow.ui.controller;

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
		ModelAndView mv=new ModelAndView("cat_hdfs");
		mv.addObject("content",this.getHdfsHelper().getFile(path).getContent());
		return mv;
	}
}
