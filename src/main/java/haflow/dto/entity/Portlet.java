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
	private int zone;
	private int column_number;
	private int width;
	private int height;
	private int left_pos;
	private int top_pos;
	
    private Report report;
    private Set<PortletConfiguration> configurations;
    
    private Set<ChartSerie> chartSeries;
  
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

	 @Column(name="zone")
	public int getZone() {
		return zone;
	}

	public void setZone(int zone) {
		this.zone = zone;
	}

	@Column(name="column_number")
	public int getColumn_number() {
		return column_number;
	}

	public void setColumn_number(int column) {
		this.column_number = column;
	}

	@Column(name="width")
	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	@Column(name="height")
	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	@Column(name="left_pos")
	public int getLeft_pos() {
		return left_pos;
	}

	public void setLeft_pos(int left_pos) {
		this.left_pos = left_pos;
	}

	@Column(name="top_pos")
	public int getTop_pos() {
		return top_pos;
	}

	public void setTop_pos(int top_pos) {
		this.top_pos = top_pos;
	}

	@OneToMany(mappedBy = "portlet", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	public Set<ChartSerie> getChartSeries() {
		return chartSeries;
	}

	public void setChartSeries(Set<ChartSerie> chartSeries) {
		this.chartSeries = chartSeries;
	}
    
	
  }