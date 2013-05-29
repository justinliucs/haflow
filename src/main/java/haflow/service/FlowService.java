package haflow.service;

import haflow.entity.Edge;
import haflow.entity.Flow;
import haflow.entity.Node;
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
public class FlowService {
	private SessionHelper sessionHelper;

	public SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	public void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean mergeFlow(UUID flowId, String name, Set<Node> nodes,
			Set<Edge> edges) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			Flow flow = (Flow) session.get(Flow.class, flowId);
			if (flow == null) {
				flow = new Flow();
				flow.setId(flowId);
				flow.setName(name);
				flow.setNodes(new HashSet<Node>());
				flow.setEdges(new HashSet<Edge>());
				session.merge(flow);
			}

			flow.setName(name);
			flow.getNodes().clear();
			flow.getEdges().clear();

			for (Node node : nodes) {
				node.setFlow(flow);
				session.merge(node);
				flow.getNodes().add(node);
			}
			for (Edge edge : edges) {
				edge.setFlow(flow);
				UUID sourceNodeId = edge.getSourceNode().getId();
				UUID targetNodeId = edge.getTargetNode().getId();
				for (Node node : nodes) {
					if (node.getId().equals(sourceNodeId)) {
						edge.setSourceNode(node);
					}
					if (node.getId().equals(targetNodeId)) {
						edge.setTargetNode(node);
					}
				}
				if (edge.getSourceNode() == null
						|| edge.getTargetNode() == null) {
					return false;
				}
				flow.getEdges().add(edge);
			}
			session.merge(flow);
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

	public boolean removeFlow(UUID flowId) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow = (Flow) session.get(Flow.class, flowId);
		if (flow == null) {
			return false;
		}

		try {
			session.delete(flow);
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
	public List<Flow> getFlowList() {
		Session session = this.getSessionHelper().openSession();
		try {
			Query query = session.createQuery("from Flow flow");
			List<Flow> flows = (List<Flow>) query.list();
			session.close();
			return flows;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}

	public Flow getFlow(UUID flowId) {
		Session session = this.getSessionHelper().openSession();
		try {
			Flow flow = (Flow) session.get(Flow.class, flowId);
			session.close();
			return flow;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}
}
