package haflow.module.basic;

import java.util.Map;

import haflow.dto.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;
import haflow.module.ModuleType;

@Module(id = "b0d027c3-a4bd-61b5-5063-134ff71f8123", name = "Kill", category = "Basic", type = ModuleType.KILL, 
	configurations = {
		@ModuleConfiguration(key = "name", displayName = "Name"),
		@ModuleConfiguration(key = "message", displayName = "Message") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {})
public final class KillModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
