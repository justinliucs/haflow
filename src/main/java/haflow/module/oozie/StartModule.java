package haflow.module.oozie;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

import java.io.StringReader;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

@Module(id = "a208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Oozie", configurations = {}, inputs = {}, outputs = { @ModuleEndpoint(name = "to", maxNumber = 1, minNumber = 1) })
public class StartModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		try {
			String xml = "<start to=\"" + outputs.get("ok").getName() + "\"/>";
			StringReader sr = new StringReader(xml);
			InputSource is = new InputSource(sr);
			Document doc = DocumentBuilderFactory.newInstance()
					.newDocumentBuilder().parse(is);
			return doc;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
