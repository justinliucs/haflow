package haflow.module.data.output;

import java.util.Map;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleConfigurationType;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

@Module(id = "21a611a8-aa63-118a-ca46-4356a0e0bdab", name = "ArffTargetFile", category = "Data-Target", type = ModuleType.DEST, 
	configurations = { @ModuleConfiguration(key = "path", displayName = "path: Data path", pattern = "^(.*)$", type = ModuleConfigurationType.PLAIN_TEXT)}, 
	inputs = {  @ModuleEndpoint(name = "path", minNumber = 1, maxNumber = 1, dataType = DataType.Arff) }, 
	outputs = {})
public class ArffOutputFileModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
