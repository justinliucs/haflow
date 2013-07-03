package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class KillModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs, List<String> arguments) {
		try {
			String name = configurations.get("name");
			String xml = "<kill name=\""
					+ name
					+ "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
