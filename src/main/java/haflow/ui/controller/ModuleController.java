package haflow.ui.controller;

import haflow.ui.helper.ModuleHelper;
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

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ModuleListModel get() {
		return this.getModuleHelper().getModuleList();
	}

	@RequestMapping(method = RequestMethod.POST)
	public ModelAndView post(@RequestParam("file") CommonsMultipartFile file) {
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
					return new ModelAndView("upload-success");
				} else {
					return new ModelAndView("upload-error");
				}
			} catch (Exception e) {
				e.printStackTrace();
				return new ModelAndView("upload-error");
			}
		}
		return new ModelAndView("upload-error");
	}

	@RequestMapping(value = "/remove/{moduleId}", method = RequestMethod.GET)
	public ModelAndView delete(@PathVariable UUID moduleId) {
		if (this.getModuleHelper().removeModule(moduleId)) {
			return new ModelAndView("remove-success");
		}
		return new ModelAndView("remove-error");
	}
}
