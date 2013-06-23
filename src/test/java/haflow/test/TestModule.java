package haflow.test;

import haflow.dto.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;
import haflow.module.ModuleType;

import java.util.Map;

@Module(category = "Test", type=ModuleType.OTHER, 
	configurations = { @ModuleConfiguration(key = "test", displayName = "Test") }, id = "92c5e828-0d02-bc7f-8825-7bbb6f48f2f1", 
	static_configurations = {},
	inputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testInput", dataType = DataType.PlainText) }, name = "TestModule", outputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testOutput", dataType = DataType.PlainText) })
public class TestModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
