package haflow.module.oozie;

import java.util.Map;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "a0d027c3-a4bd-61b5-5063-134ff71f8122", name = "End", category = "Oozie", configurations = { @ModuleConfiguration(key = "name", displayName = "Name") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {})
public class EndModule implements ModuleMetadata {

	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String name = configurations.get("name");
		String xml = "<end name=\"" + name + "\"/>";
		return xml;
	}

}
