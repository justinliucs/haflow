package haflow.engine.oozie;

import haflow.dto.entity.Flow;
import haflow.dto.entity.Node;

import java.util.UUID;

public class NodeGenerateHelper {
	public static Node generateKillNode(Flow flow){
		Node killNode = new Node();
		killNode.setFlow(flow);
		killNode.setId(UUID.randomUUID());
		killNode.setName("kill_" + killNode.getId().toString());
		
		return killNode;
	}
	
	public static Node generateEndNode(Flow flow){
		Node endNode = new Node();
		endNode.setFlow(flow);
		endNode.setId(UUID.randomUUID());
		endNode.setName("end_" + endNode.getId().toString());
		
		return endNode;
	}
}
