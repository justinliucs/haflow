package haflow.engine.oozie;

import haflow.dto.entity.Node;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class EndModuleGenerateHelper {

	public static Document generate(Node node) {
		try {
			String name = node.getName();
			String xml = "<end name=\"" + name + "\"/>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
