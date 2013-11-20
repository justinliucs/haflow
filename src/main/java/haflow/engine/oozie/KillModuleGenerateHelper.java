package haflow.engine.oozie;

import haflow.dto.entity.Node;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class KillModuleGenerateHelper {

	public static Document generate(Node node) {
		try {
			String name = node.getName();
			String xml = "<kill name=\"" + name + "\">" +
					"\n<message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message>\n" +
					"</kill>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
