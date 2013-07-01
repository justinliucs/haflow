package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "a966ef60-f825-4ed9-146b-deef78805088", name = "FileSystem", category = "Basic", type = ModuleType.FS, configurations = {
		@ModuleConfiguration(key = "delete", displayName = "Delete", pattern = "^(.*)$", order = 1),
		@ModuleConfiguration(key = "mkdir", displayName = "Make Directory", pattern = "^(.*)$", order = 2),
		@ModuleConfiguration(key = "move", displayName = "Move", pattern = "^(.*)$", order = 3),
		@ModuleConfiguration(key = "chmod", displayName = "Change Mode", pattern = "^(.*)$", order = 4) }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class FileSystemModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
