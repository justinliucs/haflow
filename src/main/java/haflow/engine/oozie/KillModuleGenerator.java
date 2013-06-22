package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class KillModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		try {
			String name = configurations.get("name");
			String xml = "<kill name=\""
					+ name
					+ "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";
			// if (i == sorted.size() - 1) {// inject kill node
			// workflowXml
			// .append("<kill name=\"fail\">"
			// + "<message>Work flow failed, "
			// +
			// "error message[${wf:errorMessage(wf:lastErrorNode())}]</message>"
			// + "</kill>" + "\n");
			// }
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
