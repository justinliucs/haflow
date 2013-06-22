package haflow.module.basic;

import java.util.Map;

import haflow.dto.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;
import haflow.module.ModuleType;

@Module(id = "a966ef60-f825-4ed9-146b-deef78805088", name = "FileSystem", category = "Basic", type = ModuleType.FS, 
	configurations = {
		@ModuleConfiguration(key = "delete", displayName = "Delete"),
		@ModuleConfiguration(key = "mkdir", displayName = "Make Directory"),
		@ModuleConfiguration(key = "move", displayName = "Move"),
		@ModuleConfiguration(key = "chmod", displayName = "Change Mode") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class FileSystemModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
