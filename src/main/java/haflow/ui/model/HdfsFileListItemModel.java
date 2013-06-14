package haflow.ui.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "file")
public class HdfsFileListItemModel {
	private String name;
	private boolean isDirectory;
	private long length;

	@XmlElement
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@XmlElement
	public boolean isDirectory() {
		return isDirectory;
	}

	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}

	@XmlElement
	public long getLength() {
		return length;
	}

	public void setLength(long length) {
		this.length = length;
	}

}
