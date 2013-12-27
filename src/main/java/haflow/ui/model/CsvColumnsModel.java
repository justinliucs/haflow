package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="csvcolumnsmodel")
public class CsvColumnsModel {

	private List<CsvColumnModel> series;
	private boolean success;
	private String message;
	
	@XmlElementWrapper(name="series")
	@XmlElement(name="serie")
	public List<CsvColumnModel> getSeries() {
		return series;
	}

	public void setSeries(List<CsvColumnModel> series) {
		this.series = series;
	}

	@XmlElement(name="message")
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@XmlElement(name="success")
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
