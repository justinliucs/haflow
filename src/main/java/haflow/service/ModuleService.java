package haflow.service;

import haflow.entity.Configuration;
import haflow.entity.Module;
import haflow.utility.SessionHelper;

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
public class ModuleService {
	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public UUID addModule(String name, Set<Configuration> configurations) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			Module module = new Module();
			module.setId(UUID.randomUUID());
			module.setName(name);
			module.setConfigurations(new HashSet<Configuration>());
			for (Configuration configuration : configurations) {
				configuration.setModule(module);
				module.getConfigurations().add(configuration);
			}
			session.merge(module);
			transaction.commit();
			session.close();
			return module.getId();
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return null;
		}
	}

	public boolean modifyModule(UUID moduleId, String newName,
			Set<Configuration> newConfigurations) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Module module = (Module) session.get(Module.class, moduleId);
		if (module == null) {
			return false;
		}

		module.setName(newName);
		module.getConfigurations().clear();
		for (Configuration configuration : newConfigurations) {
			configuration.setModule(module);
			module.getConfigurations().add(configuration);
		}

		try {
			session.merge(module);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return false;
		}
	}

	public boolean removeModule(UUID moduleId) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Module module = (Module) session.get(Module.class, moduleId);
		if (module == null) {
			return false;
		}

		try {
			session.delete(module);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	public List<Module> getModuleList() {
		Session session = this.getSessionHelper().openSession();
		try {
			Query query = session.createQuery("from Module module");
			List<Module> modules = (List<Module>) query.list();
			session.close();
			return modules;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}

	public Module getModule(UUID moduleId) {
		Session session = this.getSessionHelper().openSession();
		try {
			Module module = (Module) session.get(Module.class, moduleId);
			session.close();
			return module;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}
}
