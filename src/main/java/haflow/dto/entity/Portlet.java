 package haflow.dto.entity;
  
  import java.util.Set;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
  
  @Entity
  @Table( name="portlet")
  public class Portlet {
  
    private UUID id;
    private String title;
    private String type;
    private int position;
    
    private Report report;
    private Set<PortletConfiguration> configurations;
  
    @Id
    @Column(name="id", length = 16)
    public UUID getId() {
      return id;
    }
  
    public void setId(UUID id) {
      this.id = id;
    }
  
    @Column(name="title")
    public String getTitle() {
      return title;
    }
  
    public void setTitle(String title) {
      this.title = title;
    }
  
    @Column(name="type")
    public String getType() {
      return type;
    }
  
    public void setType(String type) {
      this.type = type;
    }
  
    @Column(name="position")
    public int getPosition() {
      return position;
    }
  
    public void setPosition(int position) {
      this.position = position;
    }
  
    @ManyToOne
    @JoinColumn(name="reportId",referencedColumnName="id")
    public Report getReport() {
      return report;
    }
  
    public void setReport(Report report) {
      this.report = report;
    }
    
    @OneToMany(mappedBy = "portlet", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<PortletConfiguration> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<PortletConfiguration> configurations) {
		this.configurations = configurations;
	}
    
  }