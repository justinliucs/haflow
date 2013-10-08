package haflow.ui.controller;

import haflow.ui.helper.RunHistoryHelper;
import haflow.ui.model.FlowRunHistoryListModel;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/runHistory")
public class RunHistoryController {

	private RunHistoryHelper runHistoryHelper;

	public RunHistoryHelper getRunHistoryHelper() {
		return runHistoryHelper;
	}

	@Autowired
	public void setRunHistoryHelper(RunHistoryHelper runHistoryHelper) {
		this.runHistoryHelper = runHistoryHelper;
	}

	@RequestMapping(value = "/{flowId}", method = RequestMethod.GET)
	public ModelAndView get(@PathVariable UUID flowId,
			HttpServletRequest request, HttpServletResponse response) {
		FlowRunHistoryListModel fhlm = this.getRunHistoryHelper()
				.getFlowRunHistoryList(flowId);
		request.setAttribute("flowHistory", fhlm);
		return new ModelAndView("run-history");
	}
}
