package haflow.module.oozie;

import java.util.Map;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "1c32fa2b-a5ec-4db7-6f29-0bd4e969af67", name = "Pig", category = "Oozie", configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker"),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node"),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare: Make Directory"),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare: Delete"),
		@ModuleConfiguration(key = "job-xml", displayName = "Job Xml"),
		@ModuleConfiguration(key = "configuration", displayName = "Configuration"),
		@ModuleConfiguration(key = "script", displayName = "Script"),
		@ModuleConfiguration(key = "param", displayName = "Parameters"),
		@ModuleConfiguration(key = "argument", displayName = "Arguments"),
		@ModuleConfiguration(key = "file", displayName = "File"),
		@ModuleConfiguration(key = "archive", displayName = "Archive"), }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1) })
public class PigModule implements ModuleMetadata {

	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return null;
	}

}
