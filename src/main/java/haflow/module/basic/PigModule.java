package haflow.module.basic;

import haflow.module.AbstractModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "1c32fa2b-a5ec-4db7-6f29-0bd4e969af67", name = "Pig", category = "Basic", type = ModuleType.PIG, 
	configurations = {
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
		@ModuleConfiguration(key = "archive", displayName = "Archive"), }, 
	static_configurations = {},
	inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class PigModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
