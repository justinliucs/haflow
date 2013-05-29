package haflow.service;

import java.util.List;
import java.util.UUID;

import haflow.entity.Node;
import haflow.profile.NodeAppearanceProfile;
import haflow.utility.SessionHelper;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NodeAppearanceProfileService {
	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean mergeNodeAppearanceProfile(UUID nodeId, int positionLeft,
			int positionTop) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeAppearanceProfile nodeAppearanceProfile = (NodeAppearanceProfile) session
					.createCriteria(NodeAppearanceProfile.class)
					.add(Restrictions.eq("nodeId", nodeId)).uniqueResult();
			if (nodeAppearanceProfile == null) {
				nodeAppearanceProfile = new NodeAppearanceProfile();
				nodeAppearanceProfile.setId(UUID.randomUUID());
			}
			nodeAppearanceProfile.setNodeId(nodeId);
			nodeAppearanceProfile.setPositionLeft(positionLeft);
			nodeAppearanceProfile.setPositionTop(positionTop);

			session.merge(nodeAppearanceProfile);
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

	public NodeAppearanceProfile getNodeAppearanceProfile(UUID nodeId) {
		return null;
	}

	@SuppressWarnings("unchecked")
	public boolean cleanUpOrphanNodeAppearanceProfiles() {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			List<NodeAppearanceProfile> list = (List<NodeAppearanceProfile>) session
					.createCriteria(NodeAppearanceProfile.class).list();
			for (NodeAppearanceProfile profile : list) {
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
