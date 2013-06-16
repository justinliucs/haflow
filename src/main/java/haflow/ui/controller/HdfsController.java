package haflow.ui.controller;

import haflow.ui.helper.HdfsHelper;
import haflow.ui.model.HdfsFileListModel;
import haflow.ui.model.HdfsFileModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hdfs")
public class HdfsController {
	private HdfsHelper hdfsHelper;

	private HdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}

	@Autowired
	private void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileListModel get(
			@RequestParam(value = "path", required = true) String path) {
		return this.getHdfsHelper().getFileList(path);
	}

	@RequestMapping(value = "/file", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileModel get(
			@RequestParam(value = "path", required = true) String path,
			@RequestParam(value = "fileName", required = true) String fileName) {
		return this.getHdfsHelper().getFile(path, fileName);
	}
}
