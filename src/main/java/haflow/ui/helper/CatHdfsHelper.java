package haflow.ui.helper;

import haflow.service.CatHdfsService;
import haflow.ui.model.HdfsFileModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CatHdfsHelper {
	private CatHdfsService hdfsService;

	private CatHdfsService getHdfsService() {
		return hdfsService;
	}

	@Autowired
	private void setHdfsService(CatHdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}
	public HdfsFileModel getFile(String path) {
		HdfsFileModel model = new HdfsFileModel();
		String ret = this.getHdfsService().readFile(path);
		if (ret != null) {
			model.setContent(ret);
			model.setLength(ret.length());
		}
		model.setPath(path);
		return model;
	}
}
