package haflow.module.data.input;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada611a8-aa63-968a-ca46-4356a0e0bdab", name = "AllSourceFile", category = "Data-Source", type = ModuleType.SOURCE, 
	configurations = { @ModuleConfiguration(key = "path", displayName = "path: Data path", pattern = "^(.*)$", type = ModuleConfigurationType.PLAIN_TEXT)}, 
	inputs = { }, 
	outputs = { @ModuleEndpoint(name = "path", minNumber = 1, maxNumber = 1, dataType = DataType.ALL)})
public class AllFileInpuModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
