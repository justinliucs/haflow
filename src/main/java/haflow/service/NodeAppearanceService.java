package haflow.service;

import java.util.List;
import java.util.UUID;

import haflow.entity.Node;
import haflow.profile.NodeAppearance;
import haflow.utility.SessionHelper;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NodeAppearanceService {
	private SessionHelper sessionHelper;

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean mergeNodeAppearance(UUID nodeId, int positionLeft,
			int positionTop) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			NodeAppearance nodeAppearanceProfile = (NodeAppearance) session
					.createCriteria(NodeAppearance.class)
					.add(Restrictions.eq("nodeId", nodeId)).uniqueResult();
			if (nodeAppearanceProfile == null) {
				nodeAppearanceProfile = new NodeAppearance();
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

	public NodeAppearance getNodeAppearance(UUID nodeId) {
		Session session = this.getSessionHelper().openSession();
		try {
			NodeAppearance nodeAppearanceProfile = (NodeAppearance) session
					.createCriteria(NodeAppearance.class)
					.add(Restrictions.eq("nodeId", nodeId)).uniqueResult();
			session.close();
			return nodeAppearanceProfile;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public boolean cleanUpOrphanNodeAppearance() {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			List<NodeAppearance> list = (List<NodeAppearance>) session
					.createCriteria(NodeAppearance.class).list();
			for (NodeAppearance profile : list) {
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
