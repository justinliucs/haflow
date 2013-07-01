package haflow.test;

import haflow.module.AbstractModule;

import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(category = "Test", type = ModuleType.OTHER, configurations = { @ModuleConfiguration(key = "test", displayName = "Test", pattern = "^(.*)$", order = 1) }, id = "92c5e828-0d02-bc7f-8825-7bbb6f48f2f1", inputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testInput", dataType = DataType.PlainText, order = 1) }, name = "TestModule", outputs = { @ModuleEndpoint(maxNumber = 1, minNumber = 1, name = "testOutput", dataType = DataType.PlainText, order = 1) })
public class TestModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
