package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "fileList")
public class HdfsFileListModel {
	private List<HdfsFileListItemModel> files;

	@XmlElementWrapper(name = "files")
	@XmlElement(name = "file")
	public List<HdfsFileListItemModel> getFiles() {
		return files;
	}

	public void setFiles(List<HdfsFileListItemModel> files) {
		this.files = files;
	}

}
