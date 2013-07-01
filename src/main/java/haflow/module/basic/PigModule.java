package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "1c32fa2b-a5ec-4db7-6f29-0bd4e969af67", name = "Pig", category = "Basic", type = ModuleType.PIG, configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker", pattern = "^(.*)$", order = 1),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node", pattern = "^(.*)$", order = 2),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare: Make Directory", pattern = "^(.*)$", order = 3),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare: Delete", pattern = "^(.*)$", order = 4),
		@ModuleConfiguration(key = "job-xml", displayName = "Job Xml", pattern = "^(.*)$", order = 5),
		@ModuleConfiguration(key = "configuration", displayName = "Configuration", pattern = "^(.*)$", order = 6),
		@ModuleConfiguration(key = "script", displayName = "Script", pattern = "^(.*)$", order = 7),
		@ModuleConfiguration(key = "param", displayName = "Parameters", pattern = "^(.*)$", order = 8),
		@ModuleConfiguration(key = "argument", displayName = "Arguments", pattern = "^(.*)$", order = 9),
		@ModuleConfiguration(key = "file", displayName = "File", pattern = "^(.*)$", order = 10),
		@ModuleConfiguration(key = "archive", displayName = "Archive", pattern = "^(.*)$", order = 11), }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class PigModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
