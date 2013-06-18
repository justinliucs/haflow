package haflow.test;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

import java.util.Map;

@Module(category = "Test", configurations = { @ModuleConfiguration(key = "test", displayName = "Test") }, id = "92c5e828-0d02-bc7f-8825-7bbb6f48f2f1", inputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testInput") }, name = "TestModule", outputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testOutput") })
public class TestModule implements ModuleMetadata {
	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		return "Test";
	}
}
