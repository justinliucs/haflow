package haflow.test;

import java.util.UUID;

import haflow.entity.Component;
import haflow.util.SessionHelper;

import org.hibernate.Session;
import org.junit.Test;

public class ComponentServiceTest {

	@Test
	public void addComponentTest() {
		Component component = new Component();
		component.setId(UUID.randomUUID());
		component.setName("Test");
		Session session = SessionHelper.openSession();
		session.beginTransaction();
		session.merge(component);
		session.getTransaction().commit();
		session.close();
	}
}
