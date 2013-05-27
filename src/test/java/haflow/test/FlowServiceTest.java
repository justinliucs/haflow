package haflow.test;

import haflow.entity.Component;
import haflow.entity.Edge;
import haflow.entity.Flow;
import haflow.entity.Node;
import haflow.util.SessionHelper;

import java.util.UUID;

import org.hibernate.Session;
import org.junit.Test;

public class FlowServiceTest {

	@Test
	public void addFlowTest() {
		Session session = SessionHelper.openSession();
		session.beginTransaction();
		Component component = (Component) session
				.createQuery("from Component component").list().get(0);
		Flow flow = new Flow();
		flow.setId(UUID.randomUUID());
		flow.setName("Test");
		Node node1 = new Node();
		node1.setComponent(component);
		node1.setFlow(flow);
		node1.setId(UUID.randomUUID());
		node1.setName("Node 1");
		Node node2 = new Node();
		node2.setComponent(component);
		node2.setFlow(flow);
		node2.setId(UUID.randomUUID());
		node2.setName("Node 1");
		Edge edge = new Edge();
		edge.setFlow(flow);
		edge.setId(UUID.randomUUID());
		edge.setSourceNode(node1);
		edge.setTargetNode(node2);
		session.save(flow);
		session.save(node1);
		session.save(node2);
		session.save(edge);
		session.getTransaction().commit();
		session.close();
	}
}
