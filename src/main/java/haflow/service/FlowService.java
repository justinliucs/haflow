
package haflow.service;

import haflow.dto.entity.Edge;
import haflow.dto.entity.Flow;
import haflow.dto.entity.MainUser;
import haflow.dto.entity.Node;
import haflow.util.SessionHelper;

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

	private SessionHelper getSessionHelper() {
		return sessionHelper;
	}

	@Autowired
	private void setSessionHelper(SessionHelper sessionHelper) {
		this.sessionHelper = sessionHelper;
	}

	public boolean saveFlow(UUID flowId, String name, Set<Node> nodes,
			Set<Edge> edges, int userid) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		try {
			MainUser user = (MainUser) session.get(MainUser.class, userid);
			Flow flow = (Flow) session.get(Flow.class, flowId);
			if (flow == null) {
				flow = new Flow();
				flow.setId(flowId);
				flow.setName(name);
				flow.setNodes(new HashSet<Node>());
				flow.setEdges(new HashSet<Edge>());
				flow.setUser(user);
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
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		} finally {
			if (session != null)
				session.close();
		}
	}

	public boolean removeFlow(UUID flowId,int userid) {
		Session session = this.getSessionHelper().openSession();
		Transaction transaction = session.beginTransaction();
		Flow flow=(Flow) session.get(Flow.class, flowId);
		MainUser user=(MainUser) session.get(MainUser.class, userid);
		if(flow==null) return false;
		try {
			for(Flow tmpFlow:user.getFlows()){
				if(flow.getId().equals(tmpFlow.getId())){
					user.getFlows().remove(tmpFlow);
					flow.setUser(null);
					session.delete(flow);
					transaction.commit();
					session.close();
					return true;
				}
			}
			return false;
		}catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return false;
		}
	}
		/*for(Flow f:user.getFlows()){
			if(f.getId().equals(flowId)){
//				user.getFlows().remove(f);
//				f.setUser(null);
				session.delete(f);
				transaction.commit();
				session.close();
				return true;
			}
					
		}*/
		
		
		/*Flow flow = (Flow) session.get(Flow.class, flowId);
		if (flow == null) {
			return false;
		}

		try {
			System.out.println("remove flow before");
			session.delete(flow);
			transaction.commit();
			session.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			session.close();
			return false;
		}*/
	
	@SuppressWarnings("unchecked")
	public List<Flow> getFlowList(int userid) {
		Session session = this.getSessionHelper().openSession();
		try {
			Query query = session.createQuery("select f from Flow f join f.user u where u.id= "+userid);
			List<Flow> flows = (List<Flow>) query.list();
			session.close();
			return flows;
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}
	}

	public Flow getFlow(UUID flowId,int userid) {
		Session session = this.getSessionHelper().openSession();
		try {
			MainUser user = (MainUser) session.get(MainUser.class, userid);

			Set<Flow> flows = (Set<Flow>) user.getFlows();
			for (Flow flow : flows) {
				if (flow.getId().equals(flowId)) {
					return flow;
				}
			}
			return null;
			//Flow flow = (Flow) session.get(Flow.class, flowId);
			
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
			return null;
		}finally{
			if(session!=null)
				session.close();
		}
	}
}
