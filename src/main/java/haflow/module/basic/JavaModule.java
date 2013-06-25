package haflow.module.basic;

import haflow.module.AbstractJavaModule;
import haflow.module.DataType;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleType;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-9085e0e0bd2e", name = "Java", category = "Basic", type = ModuleType.JAVA, configurations = {
		@ModuleConfiguration(key = "job-tracker", displayName = "Job Tracker", order = 1),
		@ModuleConfiguration(key = "name-node", displayName = "Name Node", order = 2),
		@ModuleConfiguration(key = "prepare.mkdir", displayName = "Prepare: Make Directory", order = 3),
		@ModuleConfiguration(key = "prepare.delete", displayName = "Prepare: Delete", order = 4),
		@ModuleConfiguration(key = "job-xml", displayName = "Job Xml", order = 5),
		@ModuleConfiguration(key = "configuration", displayName = "Configuration", order = 6),
		@ModuleConfiguration(key = "main-class", displayName = "Main Class", order = 7),
		@ModuleConfiguration(key = "java-opts", displayName = "Java Options", order = 8),
		@ModuleConfiguration(key = "arg", displayName = "Arguments", order = 9),
		@ModuleConfiguration(key = "file", displayName = "File", order = 10),
		@ModuleConfiguration(key = "archive", displayName = "Archive", order = 11),
		@ModuleConfiguration(key = "capture-output", displayName = "Capture Output", order = 12) }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1) }, outputs = {
		@ModuleEndpoint(name = "ok", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1, dataType = DataType.PlainText, order = 2) })
public class JavaModule extends AbstractJavaModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

	public String getMainClass() {
		return JavaModule.class.getName();
	}

	public static void main(String[] args) {
		System.out.println("Demo Java Main");

		System.out.println("# Arguments: " + args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println("Argument[" + i + "]: " + args[i]);
		}
	}

}
