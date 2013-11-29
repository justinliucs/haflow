package haflow.service;

import haflow.dto.entity.MainUser;
import haflow.dto.entity.Portlet;
import haflow.dto.entity.Report;
import haflow.util.SessionHelper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReportService {

	private SessionHelper sessionHelper;

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}
	
	@SuppressWarnings("unchecked")
	public List<Report> getReportList(int userid){
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try{
			Query query = session.createQuery("select r from Report r where r.user.id =?");
			query.setInteger(0, userid); 
			List<Report> reports = (List<Report>) query.list();
			for(Report report : reports){
				System.out.println(report.getId());
			}
			return reports;
		}catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return null;
		} finally {
			if (session != null)
				session.close();
		}
	}
	
	public boolean saveReport(UUID reportId, String name, boolean isDirectory, UUID parentId, Set<Portlet> portlets,
			int userid) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			MainUser user = (MainUser) session.get(MainUser.class, userid);
			Report report = (Report) session.get(Report.class, reportId);
			Report parentReport = null;
			if(parentId != null)
				parentReport = (Report) session.get(Report.class, parentId);
			if (report == null) {
				report = new Report();
				report.setId(reportId);

				report.setPortlets(new HashSet<Portlet>());
				report.setUser(user);
			} 
			
			report.setName(name);
			report.setDirectory(isDirectory);
			report.setParent(parentReport);
			report.getPortlets().clear();

			for( Portlet portlet : portlets ){
				portlet.setReport(report);
				session.merge(portlet);
				report.getPortlets().add(portlet);
			}
			
			session.merge(report);
			
			transaction.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		} finally {
			if (session != null)
				session.close();
		}
	}
}
