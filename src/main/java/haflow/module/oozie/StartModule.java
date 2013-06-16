package haflow.module.oozie;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

import java.util.Map;

@Module(id = "a208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Oozie", configurations = {}, inputs = {}, outputs = { @ModuleEndpoint(name = "to", maxNumber = 1, minNumber = 1) })
public class StartModule implements ModuleMetadata {

	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String xml = "<start to=\"" + outputs.get("ok").getName() + "\"/>";
		return xml;
	}

}
