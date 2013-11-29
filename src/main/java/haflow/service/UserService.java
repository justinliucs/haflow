package haflow.service;

import java.util.List;

import haflow.dto.entity.MainUser;
import haflow.util.SessionHelper;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {
	private SessionHelper sessionHelper;

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	@SuppressWarnings("unchecked")
	public boolean updateUserEmail(int userid, String email) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		MainUser user = (MainUser) session.get(MainUser.class, userid);
		if (user == null)
			return false;

		try {
			String oldemail = user.getEmail();
			if (!email.equals(oldemail)) {
				org.hibernate.Query query = session
						.createQuery("from MainUser as u where u.email=?");
				query.setString(0, email);
				List<MainUser> list = query.list();
				if (list != null) {
					return false;
				} else {
					user.setEmail(email);
				}
				session.merge(user);
				transaction.commit();
			}
			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			transaction.rollback();
			e.printStackTrace();
			return false;
		} finally {
			if (session != null)
				session.close();
		}
	}

	public boolean updateUser(int userid, String password, int role,
			double space, double usedspace, String realname) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		MainUser user = (MainUser) session.get(MainUser.class, userid);
		if (user == null)
			return false;
		try {
			if (role > 1)
				role = user.getRole();
			if (usedspace > space)
				return false;
			user.setPassword(password);
			user.setRole(role);
			user.setSpace(space);
			user.setUsedspace(usedspace);
			user.setRealname(realname);
			session.merge(user);
			transaction.commit();

			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			transaction.rollback();
			e.printStackTrace();
			return false;
		} finally {
			if (session != null)
				session.close();
		}

	}

	public boolean deleteUser(int userid) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		MainUser user = (MainUser) session.get(MainUser.class, userid);
		if (user == null)
			return false;
		try {
			session.delete(user);
			transaction.commit();

			return true;
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			transaction.rollback();
			e.printStackTrace();
			return false;
		} finally {
			if (session != null)
				session.close();
		}

	}

	@SuppressWarnings("unchecked")
	public List<MainUser> getAllUser() {
		Session session = this.getSessionHelper().openSession();

		try {
			Query query = session.createQuery("from MainUser as mainUser");
			List<MainUser> list = query.list();
			session.close();
			return list;
		} catch (Exception e) {
			System.out.println("error!!!!!!!");
			// TODO Auto-generated catch block
			session.close();
			e.printStackTrace();
			return null;
		}

	}

	public MainUser getUser(int userid) {
		Session session = this.getSessionHelper().openSession();
		try {
			MainUser user = (MainUser) session.get(MainUser.class, userid);
			if (user == null)
				return null;
			else
				return user;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (session != null)
				session.close();
		}
	}

	@SuppressWarnings("unchecked")
	public boolean saveUser(String username, String password, String email,
			String mora) {
		int role = -1;
		double space = 0.0;
		if (mora.equals("main")) {
			role = 0;
			space = 5.0;
		}
		if (mora.equals("admin")) {
			role = 1;
			space = 10.0;
		}
		if (role == -1)
			return false;
		Session session = this.getSessionHelper().openSession();
		Transaction tran = session.beginTransaction();
		try {
			org.hibernate.Query query = session
					.createQuery("from MainUser as u where u.name=?");
			query.setString(0, username);
			List<MainUser> list = query.list();
			org.hibernate.Query query1 = session
					.createQuery("from MainUser as u where u.email=?");
			query1.setString(0, email);
			List<MainUser> list1 = query1.list();

			if (list.size() == 0 && list1.size() == 0) {
				System.out.println("success!");
				MainUser user = new MainUser();
				user.setName(username);
				user.setPassword(password);
				user.setEmail(email);
				user.setRole(role);
				user.setSpace(space);
				user.setUsedspace(0.0);
				user.setPath("/" + username);
				session.save(user);
				tran.commit();
				session.close();
				return true;
			} else {
				System.out.println(list.get(0));
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			tran.rollback();
			session.close();
			return false;
		}

	}

	@SuppressWarnings("unchecked")
	public int validate(String username, String password, String mora) {
		int role = -1;
		if (mora == "admin")
			role = 1;
		if (mora == "main")
			role = 0;
		Session session = this.getSessionHelper().openSession();
		try {
			org.hibernate.Query query = session
					.createQuery("from MainUser as u where u.name=? and password=?");
			// " and role=?");
			query.setString(0, username);
			query.setString(1, password);
			// query.setInteger(2, role);
			List<MainUser> list = query.list();
			session.close();

			if (list.size() == 1) {
				int realrol = list.get(0).getRole();
				if (realrol >= role) {
					return list.get(0).getId();
				} else
					return -1;
			} else
				return -1;
		} catch (Exception e) {
			// e.printStackTrace();
			session.close();
			return -1;
		}
	}

}
