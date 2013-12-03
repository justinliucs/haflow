package haflow.ui.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement( name = "reportListModel")
public class ReportListModel {
	private List<SaveReportModel> reports;

	@XmlElementWrapper(name = "reports")
	@XmlElement(name = "report")
	public List<SaveReportModel> getReports() {
		return reports;
	}

	public void setReports(List<SaveReportModel> reports) {
		this.reports = reports;
	}
}
