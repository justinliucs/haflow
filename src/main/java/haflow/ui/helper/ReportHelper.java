package haflow.ui.helper;

import haflow.dto.entity.Portlet;
import haflow.dto.entity.Report;
import haflow.service.ReportService;
import haflow.ui.model.PortletModel;
import haflow.ui.model.ReportListModel;
import haflow.ui.model.SaveReportModel;
import haflow.ui.model.SaveReportResultModel;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReportHelper {

	private ReportService reportService;
	
	public ReportService getReportService() {
		return reportService;
	}

	@Autowired
	public void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}

	public ReportListModel getReportList(int userid){
		List<Report> reports = this.reportService.getReportList(userid);
		ReportListModel reportListModel = new ReportListModel();
		List<SaveReportModel> reportModels = new ArrayList<SaveReportModel>();
		for( Report report : reports ){
			SaveReportModel reportModel = new SaveReportModel();
			reportModel.setId(report.getId());
			reportModel.setIsdirectory(report.isDirectory());
			reportModel.setName(report.getName());
			if( report.getParent() != null){
				reportModel.setParentid(report.getParent().getId());
			}else{
				reportModel.setParentid(null);
			}
			
			Set<PortletModel> portletModels = new HashSet<PortletModel>();
			for(Portlet portlet : report.getPortlets()){
				PortletModel portletModel = new PortletModel();
				portletModel.setId(portlet.getId());
				portletModel.setPosition(portlet.getPosition());
				portletModel.setReportId(portlet.getReport().getId());
				portletModel.setTitle(portlet.getTitle());
				portletModel.setType(portlet.getType());
			}
			reportModel.setPortlets(portletModels);
			reportModels.add(reportModel);
		}
		reportListModel.setReports(reportModels);
		return reportListModel;
	}
	
	public SaveReportResultModel saveReport(UUID reportId, SaveReportModel model,int userid) {
		boolean success = this.doSaveReport(reportId, model, userid);
		SaveReportResultModel result = new SaveReportResultModel();
		result.setFlowId(reportId);
		result.setSuccess(success);
		if (success) {
			result.setMessage("success");
		} else {
			result.setMessage("fail");
		}
		return result;
	}
	
	private boolean doSaveReport(UUID reportId, SaveReportModel model,int userid) {
		Set<Portlet> portlets = new HashSet<Portlet>();
		if(  model.getPortlets() != null){
			for( PortletModel portletModel : model.getPortlets()){
				if( !portletModel.getReportId().equals(reportId)){
					return false;
				}
				Portlet portlet = new Portlet();
				portlet.setId(portletModel.getId());
				portlet.setPosition(portletModel.getPosition());
				portlet.setTitle(portletModel.getTitle());
				portlet.setType(portletModel.getType());
				
				portlets.add(portlet);
			}
		}
		boolean result = true;
		result = result
				&& this.getReportService().saveReport(reportId, model.getName(), model.getIsdirectory(), model.getParentid(), portlets, userid);
		
		return result;
	}
}
