package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "1c32fa2b-a5ec-4db7-6f29-0bd4e969af67", name = "Pig", category = "Basic", type = ModuleType.PIG, configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker", order = 1),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node", order = 2),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare: Make Directory", order = 3),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare: Delete", order = 4),
		@ModuleConfiguration(key = "job-xml", displayName = "Job Xml", order = 5),
		@ModuleConfiguration(key = "configuration", displayName = "Configuration", order = 6),
		@ModuleConfiguration(key = "script", displayName = "Script", order = 7),
		@ModuleConfiguration(key = "param", displayName = "Parameters", order = 8),
		@ModuleConfiguration(key = "argument", displayName = "Arguments", order = 9),
		@ModuleConfiguration(key = "file", displayName = "File", order = 10),
		@ModuleConfiguration(key = "archive", displayName = "Archive", order = 11), }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
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
