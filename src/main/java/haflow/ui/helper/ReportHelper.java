package haflow.ui.helper;

import haflow.dto.entity.ChartSerie;
import haflow.dto.entity.Portlet;
import haflow.dto.entity.PortletConfiguration;
import haflow.dto.entity.Report;
import haflow.service.ReportService;
import haflow.ui.model.ChartSerieModel;
import haflow.ui.model.PortletConfigurationItemModel;
import haflow.ui.model.PortletModel;
import haflow.ui.model.ReportListModel;
import haflow.ui.model.ReportResultModel;
import haflow.ui.model.SaveReportModel;

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
	private void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}

	public ReportListModel getReportList(int userid){
		Set<Report> reports = this.reportService.getReportList(userid);
		ReportListModel reportListModel = new ReportListModel();
		List<SaveReportModel> reportModels = new ArrayList<SaveReportModel>();
		for( Report report : reports ){
			SaveReportModel reportModel = new SaveReportModel();
			reportModel.setId(report.getId());
			reportModel.setIsdirectory(report.isDirectory());
			reportModel.setName(report.getName());
			reportModel.setNbZones(report.getNbZones());
			reportModel.setPanelType(report.getPanelType());
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
				portletModel.setColumn(portlet.getColumn_number());
				portletModel.setZone(portlet.getZone());
				portletModel.setWidth(portlet.getWidth());
				portletModel.setHeight(portlet.getHeight());
				portletModel.setLeft(portlet.getLeft_pos());
				portletModel.setTop(portlet.getTop_pos());
				portletModel.setChartTitle(portlet.getChart_title());
				
				Set<PortletConfigurationItemModel> configurations = new HashSet<PortletConfigurationItemModel>();
				for( PortletConfiguration pc : portlet.getConfigurations() ){
					PortletConfigurationItemModel pcim = new PortletConfigurationItemModel();
					pcim.setId(pc.getId());
					pcim.setKey(pc.getKey());
					pcim.setValue(pc.getValue());
					pcim.setValue_type(pc.getValue_type());
					configurations.add(pcim);
				}
				portletModel.setConfigurations(configurations);
				
				Set<ChartSerieModel> chartSeries = new HashSet<ChartSerieModel>();
				for( ChartSerie cs : portlet.getChartSeries()){
					ChartSerieModel csm = new ChartSerieModel();
					csm.setId(cs.getId());
					csm.setName(cs.getName());
					csm.setColumn_index(cs.getColumn_index());
					csm.setFile_path(cs.getFile_path());
					chartSeries.add(csm);
				}
				portletModel.setChartSeries(chartSeries);
				
				portletModels.add(portletModel);
			}
			reportModel.setPortlets(portletModels);
			reportModels.add(reportModel);
		}
		reportListModel.setReports(reportModels);
		return reportListModel;
	}
	
	public ReportResultModel saveReport(UUID reportId, SaveReportModel model,int userid) {
		boolean success = this.doSaveReport(reportId, model, userid);
		ReportResultModel result = new ReportResultModel();
		result.setReportId(reportId);
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
				portlet.setZone(portletModel.getZone());
				portlet.setColumn_number(portletModel.getColumn());
				portlet.setWidth(portletModel.getWidth());
				portlet.setHeight(portletModel.getHeight());
				portlet.setLeft_pos(portletModel.getLeft());
				portlet.setTop_pos(portletModel.getTop());
				portlet.setChart_title(portletModel.getChartTitle());
				
				Set<PortletConfiguration> portletConfigurations = new HashSet<PortletConfiguration>();
				for( PortletConfigurationItemModel cim : portletModel.getConfigurations()){
					PortletConfiguration pc = new PortletConfiguration();
					pc.setId(cim.getId());
					pc.setKey(cim.getKey());
					pc.setValue(cim.getValue());
					pc.setValue_type(cim.getValue_type());
					pc.setPortlet(portlet);
					portletConfigurations.add(pc);
				}
				portlet.setConfigurations(portletConfigurations);
				
				Set<ChartSerie> chartSeries = new HashSet<ChartSerie>();
				for( ChartSerieModel csm : portletModel.getChartSeries()){
					ChartSerie cs = new ChartSerie();
					cs.setId(csm.getId());
					cs.setName(csm.getName());
					cs.setFile_path(csm.getFile_path());
					cs.setColumn_index(csm.getColumn_index());
					cs.setPortlet(portlet);
					chartSeries.add(cs);
				}
				portlet.setChartSeries(chartSeries);
				
				portlets.add(portlet);
			}
		}
		boolean result = true;
		result = result
				&& this.getReportService().saveReport(reportId, model.getName(), model.getIsdirectory(), model.getNbZones(), model.getPanelType(), model.getParentid(), portlets, userid);
		
		return result;
	}

	public ReportResultModel removeReport(UUID reportId, Integer userId) {
		Set<UUID> deletedReportIds = new HashSet<UUID>();
		boolean result = this.reportService.removeReport(reportId, userId, deletedReportIds);
		ReportResultModel reportResultModel = new ReportResultModel();
		reportResultModel.setReportId(reportId);
		reportResultModel.setSuccess(result);
		reportResultModel.setDeletedReportIds(deletedReportIds);
		if(result){
			reportResultModel.setMessage("success");
		}else{
			reportResultModel.setMessage("fail");
		}
		return reportResultModel;
	}
}
