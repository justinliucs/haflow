package haflow.ui.model;

import java.util.Set;
import java.util.UUID;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="portlet")
public class PortletModel {
	private UUID id;
	private String title;
	private String type;
	private int position;
	private int zone;
	private int column;
	private int width;
	private int height;
	private int left;
	private int top;
	private String chartTitle;
	
	private UUID reportId;
	private Set<PortletConfigurationItemModel> configurations;
	
	private Set<ChartSerieModel> chartSeries;

	@XmlElement
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}

	@XmlElement
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}

	@XmlElement
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

	@XmlElement
	public int getPosition() {
		return position;
	}
	public void setPosition(int position) {
		this.position = position;
	}

	@XmlElement
	public UUID getReportId() {
		return reportId;
	}
	public void setReportId(UUID reportId) {
		this.reportId = reportId;
	}
	
	@XmlElementWrapper(name="configurations")
	@XmlElement(name="configuration")
	public Set<PortletConfigurationItemModel> getConfigurations() {
		return configurations;
	}
	public void setConfigurations(Set<PortletConfigurationItemModel> configurations) {
		this.configurations = configurations;
	}
	
	@XmlElement
	public int getZone() {
		return zone;
	}
	public void setZone(int zone) {
		this.zone = zone;
	}
	
	@XmlElement
	public int getColumn() {
		return column;
	}
	public void setColumn(int column) {
		this.column = column;
	}
	
	@XmlElement
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	
	@XmlElement
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	
	@XmlElement
	public int getLeft() {
		return left;
	}
	public void setLeft(int left) {
		this.left = left;
	}
	
	@XmlElement
	public int getTop() {
		return top;
	}
	public void setTop(int top) {
		this.top = top;
	}
	
	
	public String getChartTitle() {
		return chartTitle;
	}
	public void setChartTitle(String chartTitle) {
		this.chartTitle = chartTitle;
	}
	@XmlElementWrapper(name="chartSeries")
	@XmlElement(name="chartSerie")
	public Set<ChartSerieModel> getChartSeries() {
		return chartSeries;
	}
	
	public void setChartSeries(Set<ChartSerieModel> chartSeries) {
		this.chartSeries = chartSeries;
	}
	
	
}
