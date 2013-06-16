package haflow.service;

import haflow.entity.Node;
import haflow.profile.NodeConfiguration;
import haflow.utility.SessionHelper;

import java.util.List;
import java.util.UUID;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NodeConfigurationService {
	private SessionHelper sessionHelper;

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean mergeNodeConfiguration(UUID nodeId, String key, String value) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeConfiguration nodeConfigurationProfile = (NodeConfiguration) session
					.createCriteria(NodeConfiguration.class)
					.add(Restrictions.eq("nodeId", nodeId))
					.add(Restrictions.eq("key", key)).uniqueResult();
			if (nodeConfigurationProfile == null) {
				nodeConfigurationProfile = new NodeConfiguration();
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

	public boolean removeNodeConfiguration(UUID nodeId, String key) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeConfiguration nodeConfigurationProfile = (NodeConfiguration) session
					.createCriteria(NodeConfiguration.class)
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
	public List<NodeConfiguration> getNodeConfiguration(UUID nodeId) {
		Session session = this.getSessionHelper().openSession();
		try {
			List<NodeConfiguration> nodeConfigurationProfiles = (List<NodeConfiguration>) session
					.createCriteria(NodeConfiguration.class)
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
	public boolean cleanUpOrphanNodeConfiguration() {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			List<NodeConfiguration> list = (List<NodeConfiguration>) session
					.createCriteria(NodeConfiguration.class).list();
			for (NodeConfiguration profile : list) {
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
