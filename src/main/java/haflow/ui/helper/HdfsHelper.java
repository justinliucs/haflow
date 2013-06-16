package haflow.ui.helper;

import java.util.ArrayList;

import haflow.service.HdfsService;
import haflow.ui.model.HdfsFileListItemModel;
import haflow.ui.model.HdfsFileListModel;
import haflow.ui.model.HdfsFileModel;

import org.apache.hadoop.fs.FileStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HdfsHelper {
	private HdfsService hdfsService;

	private HdfsService getHdfsService() {
		return hdfsService;
	}

	@Autowired
	private void setHdfsService(HdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}

	public HdfsFileListModel getFileList(String path) {
		HdfsFileListModel model = new HdfsFileListModel();
		model.setFiles(new ArrayList<HdfsFileListItemModel>());
		FileStatus[] status = this.getHdfsService().listFile(path);
		if (status != null) {
			for (FileStatus stat : status) {
				HdfsFileListItemModel file = new HdfsFileListItemModel();
				file.setName(stat.getPath().getName());
				file.setLength(stat.getLen());
				file.setDirectory(stat.isDir());
				model.getFiles().add(file);
			}
		}
		return model;

	}

	public HdfsFileModel getFile(String path, String fileName) {
		HdfsFileModel model = new HdfsFileModel();
		String filePath = path + "/" + fileName;
		String ret = this.getHdfsService().readFile(filePath);
		if (ret != null) {
			model.setContent(ret);
			model.setLength(ret.length());
		}
		model.setPath(filePath);
		return model;
	}
}
