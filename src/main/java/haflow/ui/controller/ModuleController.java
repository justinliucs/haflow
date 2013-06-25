package haflow.ui.controller;

import java.io.File;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import haflow.ui.helper.ModuleHelper;
import haflow.ui.model.ModuleListModel;

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
	public ModelAndView post(HttpServletRequest request,
			@RequestParam("file") CommonsMultipartFile file) {
		if (!file.isEmpty()) {
			try {
				String fileName = file.getOriginalFilename();
				String[] suffixs = fileName.split("\\.");
				String suffix = "." + suffixs[suffixs.length - 1];
				if ((".jar".indexOf(suffix.toLowerCase()) != -1)) {
					byte[] bytes = file.getBytes();
					String uploadDir = Thread.currentThread()
							.getContextClassLoader().getResource("/").getFile();
					String filePath = uploadDir + fileName;
					File toUpload = new File(filePath);
					FileCopyUtils.copy(bytes, toUpload);
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
