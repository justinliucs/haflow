package haflow.service;

import haflow.entity.Node;
import haflow.profile.NodeConfigurationProfile;
import haflow.utility.SessionHelper;

import java.util.List;
import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NodeConfigurationProfileService {
	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean mergeNodeConfigurationProfile(UUID nodeId, String key,
			String value) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeConfigurationProfile nodeConfigurationProfile = (NodeConfigurationProfile) session
					.createCriteria(NodeConfigurationProfile.class)
					.add(Restrictions.eq("nodeId", nodeId))
					.add(Restrictions.eq("key", key)).uniqueResult();
			if (nodeConfigurationProfile == null) {
				nodeConfigurationProfile = new NodeConfigurationProfile();
				nodeConfigurationProfile.setId(UUID.randomUUID());
			}
			nodeConfigurationProfile.setNodeId(nodeId);
			nodeConfigurationProfile.setKey(key);
			nodeConfigurationProfile.setValue(value);
			session.merge(nodeConfigurationProfile);
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

	public boolean removeNodeConfigurationProfile(UUID nodeId, String key) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeConfigurationProfile nodeConfigurationProfile = (NodeConfigurationProfile) session
					.createCriteria(NodeConfigurationProfile.class)
					.add(Restrictions.eq("nodeId", nodeId))
					.add(Restrictions.eq("key", key)).uniqueResult();
			if (nodeConfigurationProfile == null) {
				return false;
			}
			session.delete(nodeConfigurationProfile);
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
	public List<NodeConfigurationProfile> getNodeConfigurationProfile(
			UUID nodeId) {
		Session session = this.getSessionHelper().openSession();
		try {
			List<NodeConfigurationProfile> nodeConfigurationProfiles = (List<NodeConfigurationProfile>) session
					.createCriteria(NodeConfigurationProfile.class)
					.add(Restrictions.eq("nodeId", nodeId)).list();
			session.close();
			return nodeConfigurationProfiles;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public boolean cleanUpOrphanNodeConfigurationProfiles() {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			List<NodeConfigurationProfile> list = (List<NodeConfigurationProfile>) session
					.createCriteria(NodeConfigurationProfile.class).list();
			for (NodeConfigurationProfile profile : list) {
				Node node = (Node) session.get(Node.class, profile.getNodeId());
				if (node == null) {
					session.delete(profile);
				}
			}
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
}
