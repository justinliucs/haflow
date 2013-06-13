package haflow.module.oozie;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;
import haflow.utility.XmlHelper;

import java.util.Map;

import org.w3c.dom.Document;

@Module(id = "a208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Oozie", configurations = {}, inputs = {}, outputs = { @ModuleEndpoint(name = "to", maxNumber = 1, minNumber = 1) })
public class StartModule implements ModuleMetadata {

	private XmlHelper xmlHelper = XmlHelper.getInstance();

	// TODO: Fix it
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// <start to="java-node"/>
		String ok = configurations.get("ok");

		String xml = "<start to=\"" + ok + "\"/>";
		return this.xmlHelper.getDocument(xml);
	}

}
