package haflow.service;

import haflow.dto.entity.MainUser;
import haflow.dto.entity.Portlet;
import haflow.dto.entity.Report;
import haflow.util.SessionHelper;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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
	
	public Set<Report> getReportList(int userid){
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try{
//			Query query = session.createQuery("select r from Report r where r.user.id =?");
//			query.setInteger(0, userid); 
//			List<Report> reports = (List<Report>) query.list();
//			for(Report report : reports){
//				System.out.println(report.getId());
//			}
//			return reports;
			
			MainUser user = (MainUser)session.get(MainUser.class, userid);
			Set<Report> reports = user.getReports();
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

	public boolean removeReport(UUID reportId, Integer userId, Set<UUID> deletedReportIds) {
		Session session = this.sessionHelper.openSession();
		Report report = (Report)session.get(Report.class, reportId);
		MainUser user = (MainUser)session.get(MainUser.class, userId);
		if( report == null || user == null){
			return false;
		}
		boolean result = this.doRemoveReportItem(report, user, session, deletedReportIds);
		session.close();
		return result;
		
	}
	
	private boolean doRemoveReportItem(Report report, MainUser user, Session session, Set<UUID> deletedReportIds) {
		if (report == null || user == null) {
			return false;
		}
		Set<Report> children = new HashSet<Report>();//report.getChildren();
		children.addAll(report.getChildren());
		if( children != null && children.size() > 0){
			for( Report child : children ){
				boolean result = doRemoveReportItem(child, user, session, deletedReportIds);
				if( !result){
					return false;
				}
			}
		}
		return this.doRemoveReport(report, user, session, deletedReportIds);
	}
	
	private boolean doRemoveReport(Report report, MainUser user, Session session, Set<UUID> deletedReportIds){
		Transaction transaction = session.beginTransaction();
		if( report == null || user == null){
			return false;
		}
		if( report.getParent() != null){
			report.getParent().getChildren().remove(report);
		}
		try{
			for (Report userReport : user.getReports()) {
				if (report.getId().equals(userReport.getId())) {
					user.getReports().remove(userReport);
					report.setUser(null);
					report.setParent(null);
					session.delete(report);
					System.out.println("done delete " + report.getName() + " " + report.getId() + " " + report.isDirectory());
					transaction.commit();
					deletedReportIds.add(report.getId());
					return true;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			transaction.rollback();
		}
		return true;
	}
}
