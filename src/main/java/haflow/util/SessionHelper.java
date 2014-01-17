package haflow.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.springframework.stereotype.Component;

@Component
public final class SessionHelper {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public SessionHelper() {
		try {
			Configuration cfg = new Configuration().configure();
//			cfg.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/haflow");
//			cfg.setProperty("hibernate.connection.username", "root");
//			cfg.setProperty("hibernate.connection.password", "123456");
			ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
					.applySettings(cfg.getProperties()).build();
			this.setSessionFactory(cfg.buildSessionFactory(serviceRegistry));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Session openSession() {
		return this.getSessionFactory().openSession();
	}
}