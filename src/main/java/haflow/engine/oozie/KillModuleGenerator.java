package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.Map;

import org.w3c.dom.Document;

public class KillModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		
		String name = configurations.get("name");
		    String xml = "<kill name=\""
		        + name
		        + "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";

//			if (i == sorted.size() - 1) {// inject kill node
//			workflowXml
//					.append("<kill name=\"fail\">"
//							+ "<message>Work flow failed, "
//							+ "error message[${wf:errorMessage(wf:lastErrorNode())}]</message>"
//							+ "</kill>" + "\n");
//		}
		return null;
	}

}
