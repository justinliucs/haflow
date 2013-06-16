package haflow.module.oozie;

import java.util.Map;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "b0d027c3-a4bd-61b5-5063-134ff71f8123", name = "Kill", category = "Oozie", configurations = {
		@ModuleConfiguration(key = "name", displayName = "Name"),
		@ModuleConfiguration(key = "message", displayName = "Message") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {})
public class KillModule implements ModuleMetadata {

	// TODO: Fix it
	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String name = configurations.get("name");
		String xml = "<kill name=\""
				+ name
				+ "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";
		return xml;
	}

}
