package haflow.ui.model;

import javax.xml.bind.annotation.XmlElement;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "CreateDirectoryModel")
public class CreateDirectoryModel {
	private boolean success;
	private String message;
	private String directoryname;
	
	@XmlElement(name = "success")
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	@XmlElement(name = "message")
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	@XmlElement(name = "directoryname")
	public String getdirectoryname() {
		return directoryname;
	}

	public void setdirectoryname(String directoryname) {
		this.directoryname = directoryname;
	}
}
