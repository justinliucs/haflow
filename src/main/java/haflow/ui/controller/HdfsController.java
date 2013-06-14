package haflow.ui.controller;

import haflow.ui.helper.HdfsHelper;
import haflow.ui.model.HdfsFileListModel;
import haflow.ui.model.HdfsFileModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/hdfs")
public class HdfsController {
	private HdfsHelper hdfsHelper;

	public HdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}

	@Autowired
	public void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	@RequestMapping(value = "/{path}", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileListModel get(@PathVariable String path) {
		System.out.println(path);
		return this.getHdfsHelper().getFileList(path);
	}

	@RequestMapping(value = "/{path}/{fileName}", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileModel get(@PathVariable String path,
			@PathVariable String fileName) {
		return this.getHdfsHelper().getFile(path, fileName);
	}
}
