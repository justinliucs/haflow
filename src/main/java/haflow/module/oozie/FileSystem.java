package haflow.module.oozie;

import java.util.Map;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "a966ef60-f825-4ed9-146b-deef78805088", name = "FileSystem", category = "Oozie", configurations = {
		@ModuleConfiguration(key = "delete", displayName = "Delete"),
		@ModuleConfiguration(key = "mkdir", displayName = "Make Directory"),
		@ModuleConfiguration(key = "move", displayName = "Move"),
		@ModuleConfiguration(key = "chmod", displayName = "Change Mode") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1) })
public class FileSystem implements ModuleMetadata {

	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return null;
	}

}
