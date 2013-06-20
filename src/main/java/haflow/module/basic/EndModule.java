package haflow.module.basic;

import java.util.Map;

import haflow.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;

@Module(id = "a0d027c3-a4bd-61b5-5063-134ff71f8122", name = "End", category = "Basic", configurations = { @ModuleConfiguration(key = "name", displayName = "Name") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {})
public class EndModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
