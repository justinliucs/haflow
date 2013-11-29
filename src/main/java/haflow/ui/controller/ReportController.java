package haflow.ui.controller;

import haflow.ui.helper.ReportHelper;
import haflow.ui.model.ReportListModel;
import haflow.ui.model.SaveReportModel;
import haflow.ui.model.SaveReportResultModel;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/report")
public class ReportController {

	private ReportHelper reportHelper;
		
	@Autowired
	private void setReportHelper(ReportHelper reportHelper) {
		this.reportHelper = reportHelper;
	}

	@RequestMapping(value = "/{reportId}", method = RequestMethod.PUT)
	@ResponseBody
	public SaveReportResultModel put(@PathVariable UUID reportId,
			@RequestBody SaveReportModel model,HttpServletRequest request) {
		System.out.println("save report");
		return this.reportHelper.saveReport(reportId, model,(Integer)request.getSession().getAttribute("userid"));
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ReportListModel get(HttpServletRequest request) {
		int userid = (Integer)request.getSession().getAttribute("userid");
		ReportListModel reportListModel =  this.reportHelper.getReportList(userid);
		if( reportListModel.getReports().size() == 0){
			SaveReportModel model = new SaveReportModel();
			model.setId(UUID.randomUUID());
			model.setIsdirectory(true);
			model.setName("Reports");
			model.setParentid(null);
			model.setPortlets(null);
			this.reportHelper.saveReport(model.getId(), model, userid);
			reportListModel =  this.reportHelper.getReportList(userid);
		}
		return reportListModel;
	}
}
