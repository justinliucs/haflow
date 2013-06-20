package haflow.module.basic;

import haflow.entity.Node;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.AbstractModule;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-9085e0e0bd2e", name = "Java", category = "Basic", configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker"),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node"),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare: Make Directory"),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare: Delete"),
		@ModuleConfiguration(key = "job-xml", displayName = "Job Xml"),
		@ModuleConfiguration(key = "configuration", displayName = "Configuration"),
		@ModuleConfiguration(key = "main-class", displayName = "Main Class"),
		@ModuleConfiguration(key = "java-opts", displayName = "Java Options"),
		@ModuleConfiguration(key = "arg", displayName = "Arguments"),
		@ModuleConfiguration(key = "file", displayName = "File"),
		@ModuleConfiguration(key = "archive", displayName = "Archive"),
		@ModuleConfiguration(key = "capture-output", displayName = "Capture Output") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText) })
public class JavaModule extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
