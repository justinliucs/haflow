package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "a0d027c3-a4bd-61b5-5063-134ff71f8122", name = "End", category = "Basic", type = ModuleType.END, 
	configurations = { @ModuleConfiguration(key = "name", displayName = "Name", pattern = "^(.*)$", type=ModuleConfigurationType.PLAIN_TEXT,order = 1) }, 
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {})
public final class EndModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
