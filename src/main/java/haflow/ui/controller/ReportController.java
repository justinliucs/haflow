package haflow.ui.controller;

import haflow.ui.helper.HdfsHelper;
import haflow.ui.helper.ReportHelper;
import haflow.ui.model.ChartSerieModel;
import haflow.ui.model.CsvColumnModel;
import haflow.ui.model.CsvColumnsModel;
import haflow.ui.model.ReportListModel;
import haflow.ui.model.ReportResultModel;
import haflow.ui.model.SaveReportModel;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/report")
public class ReportController {

	private ReportHelper reportHelper;
	private HdfsHelper hdfsHelper;
		
	@Autowired
	private void setReportHelper(ReportHelper reportHelper) {
		this.reportHelper = reportHelper;
	}
	
	@Autowired
	private void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	@RequestMapping(value = "/{reportId}", method = RequestMethod.PUT)
	@ResponseBody
	public ReportResultModel put(@PathVariable UUID reportId,
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
			model.setNbZones(-1);
			model.setPanelType("none");
			model.setParentid(null);
			model.setPortlets(null);
			this.reportHelper.saveReport(model.getId(), model, userid);
			reportListModel =  this.reportHelper.getReportList(userid);
		}
		return reportListModel;
	}
	
	@RequestMapping(value = "/{reportId}", method = RequestMethod.DELETE)
	@ResponseBody
	public ReportResultModel delete(@PathVariable UUID reportId, HttpServletRequest request) {
		return this.reportHelper.removeReport(reportId,
				(Integer) request.getSession().getAttribute("userid"));
	}
	
	@RequestMapping(value = "/getcsvcolumndata", method = RequestMethod.GET)
	@ResponseBody
	public CsvColumnModel getCsvColumnData(
			@RequestParam(value = "file_path", required = true) String file_path,
			@RequestParam(value = "column_index", required = true) String column_index) {
//		String in_path=file_path;
		int columnIndex = Integer.valueOf(column_index);
		try {
			String formatedPath = new String(file_path.getBytes("iso-8859-1"),"UTF-8");
			return this.hdfsHelper.getCsvColumnData(formatedPath, columnIndex);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}

	}
	
	@RequestMapping(value = "/getchartseries", method = RequestMethod.POST)
	@ResponseBody
	public CsvColumnsModel getChartSeries(@RequestBody List<ChartSerieModel> chartSerieProfileModelList, HttpServletRequest request) {
		CsvColumnsModel ccsm = new CsvColumnsModel();
		List<CsvColumnModel> series = new ArrayList<CsvColumnModel>();
		for(int i = 0; i < chartSerieProfileModelList.size(); i++){
			ChartSerieModel cspm = chartSerieProfileModelList.get(i);
			CsvColumnModel ccm = this.getCsvColumnData(cspm.getFile_path(), cspm.getColumn_index());
			series.add(ccm);
		}
		ccsm.setSeries(series);
		return ccsm;
//		return this.reportHelper.getChartSeries(chartSerieProfilesModel);
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.POST)
	@ResponseBody
	public CsvColumnsModel test(HttpServletRequest request) {
		CsvColumnsModel ccsm = new CsvColumnsModel();
		List<CsvColumnModel> ccms = new ArrayList<CsvColumnModel>();
		CsvColumnModel ccm = new CsvColumnModel();
		List<Double> data = new ArrayList<Double>();
		data.add(1.2);data.add(1.5);
		ccm.setData(data);
		ccm.setColumnname("test");
		ccms.add(ccm);
		ccsm.setSeries(ccms);
		return ccsm;
//		return this.reportHelper.getChartSeries(chartSerieProfilesModel);
	}
	
	@RequestMapping({ "/grid" })
	public ModelAndView oozie() {
		return new ModelAndView("grid");
	}
}
