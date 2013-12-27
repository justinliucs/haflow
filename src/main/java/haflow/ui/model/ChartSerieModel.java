package haflow.ui.model;

import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="chartserie")
public class ChartSerieModel {
	private UUID id;
	private String column_index;
	private String file_path;
	private String name;
	
	@XmlElement
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	
	@XmlElement
	public String getColumn_index() {
		return column_index;
	}
	public void setColumn_index(String column_index) {
		this.column_index = column_index;
	}
	
	@XmlElement
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	
	@XmlElement
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
