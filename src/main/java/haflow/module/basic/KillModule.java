package haflow.module.basic;

import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "b0d027c3-a4bd-61b5-5063-134ff71f8123", name = "Kill", category = "Basic", configurations = {
		@ModuleConfiguration(key = "name", displayName = "Name"),
		@ModuleConfiguration(key = "message", displayName = "Message") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {})
public class KillModule implements ModuleMetadata {

	// TODO: Fix it
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String name = configurations.get("name");
		String xml = "<kill name=\""
				+ name
				+ "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			StringReader sr = new StringReader(xml);
			InputSource is = new InputSource(sr);
			Document doc = db.parse(is);
			return doc;
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
		return null;
	}

}
