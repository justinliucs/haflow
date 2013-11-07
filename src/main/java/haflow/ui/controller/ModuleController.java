package haflow.ui.controller;

import haflow.ui.helper.ModuleHelper;
import haflow.ui.model.ModuleBriefModel;
import haflow.ui.model.ModuleListModel;

import java.io.File;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/module")
public class ModuleController {
	private Logger logger = Logger.getLogger(ModuleController.class.getName());
	private ModuleHelper moduleHelper;

	private ModuleHelper getModuleHelper() {
		return moduleHelper;
	}

	@Autowired
	private void setModuleHelper(ModuleHelper moduleHelper) {
		this.moduleHelper = moduleHelper;
	}
	@RequestMapping(value="/get/{moduleId}",method=RequestMethod.GET)
	@ResponseBody
	public ModuleBriefModel get(@PathVariable UUID moduleId){
		return this.getModuleHelper().getModule(moduleId);
	}
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ModuleListModel get() {
		return this.getModuleHelper().getModuleList();
	}

	@RequestMapping(method = RequestMethod.POST)
	public String post(RedirectAttributes redirectAttributes, @RequestParam("file") CommonsMultipartFile file) {
		if (!file.isEmpty()) {
			try {
				String fileName = file.getOriginalFilename();
				if (fileName.endsWith(".jar")) {
					byte[] bytes = file.getBytes();
					String clazzPath = Thread.currentThread()
							.getContextClassLoader().getResource("/").getFile();
					String uploadDir = clazzPath.substring(0, clazzPath.length()-8) + "lib/";
					String filePath = uploadDir + fileName;
					File toUpload = new File(filePath);
					FileCopyUtils.copy(bytes, toUpload);
					logger.info(fileName + " uploaded to : " + filePath);
					redirectAttributes.addFlashAttribute("uploadmessage","upload successed!");
					return "redirect:/adminhome";
				} else {
					redirectAttributes.addAttribute("uploadmessage","upload failed!");
					return "redirect:/adminhome";
				}
			} catch (Exception e) {
				e.printStackTrace();
				redirectAttributes.addAttribute("uploadmessage","upload failed!");
				return "redirect:/adminhome";
			}
		}
		redirectAttributes.addFlashAttribute("uploadmessage","upload failed!");
		return "redirect:/adminhome";
	}

	@RequestMapping(value = "/remove/{moduleId}", method = RequestMethod.GET)
	public String delete(RedirectAttributes redirectAttributes,@PathVariable UUID moduleId) {
		if (this.getModuleHelper().removeModule(moduleId)) {
			redirectAttributes.addFlashAttribute("uploadmessage","remove successed!");
			return "redirect:/adminhome";
		}
		redirectAttributes.addFlashAttribute("uploadmessage","remove failed!");
		return "redirect:/adminhome";
	}
}
