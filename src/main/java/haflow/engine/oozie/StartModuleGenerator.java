package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class StartModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs, List<String> arguments) {
		System.out.println(outputs.size());
		try {
			String xml = "<start to=\"" + outputs.get("to").getName() + "\"/>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
