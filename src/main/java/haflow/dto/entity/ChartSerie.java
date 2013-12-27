package haflow.dto.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table( name = "chartserie")
public class ChartSerie {
	private UUID id;
	private String column_index;
	private String file_path;
	private String name;
	
	private Portlet portlet;
	
	@Id
    @Column(name="id", length = 16)
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	
	@Column(name="column_index")
	public String getColumn_index() {
		return column_index;
	}
	public void setColumn_index(String column_index) {
		this.column_index = column_index;
	}
	
	@Column(name="file_path")
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	
	@Column(name="name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@ManyToOne
	@JoinColumn( name="portletid", referencedColumnName="id")
	public Portlet getPortlet() {
		return portlet;
	}
	public void setPortlet(Portlet portlet) {
		this.portlet = portlet;
	}
}
