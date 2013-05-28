package haflow.test;

import haflow.entity.Flow;
import haflow.utility.SessionHelper;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.junit.Test;

public class FlowServiceTest {
	@Test
	public void flowTest() {
		SessionHelper sessionHelper = new SessionHelper();
		Session session = sessionHelper.openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow = (Flow) session.createQuery("from Flow flow").uniqueResult();
		flow.getNodes().remove(0);
		session.merge(flow);
		transaction.commit();
		session.close();
	}
}
