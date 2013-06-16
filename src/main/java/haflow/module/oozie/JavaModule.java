package haflow.module.oozie;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

import java.util.Map;

@Module(id = "ada600a8-aa63-968a-ca46-9085e0e0bd2e", name = "Java", category = "Oozie", configurations = {
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
		@ModuleConfiguration(key = "capture-output", displayName = "Capture Output") }, inputs = { @ModuleEndpoint(name = "from", minNumber = 1, maxNumber = 1) }, outputs = {
		@ModuleEndpoint(name = "to", minNumber = 1, maxNumber = 1),
		@ModuleEndpoint(name = "error", minNumber = 1, maxNumber = 1) })
public class JavaModule implements ModuleMetadata {
	// TODO: Fix it
	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String name = configurations.get("name");
		String arg = configurations.get("arg");
		String ok = configurations.get("ok");
		String mainClass = configurations.get("mainClass");

		Class<?> moduleClass = this.getClass();
		assert (moduleClass.isAnnotationPresent(haflow.module.Module.class));
		// String moduleName =
		// moduleClass.getAnnotation(haflow.module.Module.class).name();

		String actionXML = "<action name=\"" + name + "\">" + "\n" + "<java>"
				+ "\n" + "<job-tracker>${jobTracker}</job-tracker>" + "\n"
				+ "<name-node>${nameNode}</name-node>" + "\n"
				+ "<configuration>" + "\n" + "<property>" + "\n"
				+ "<name>mapred.job.queue.name</name>" + "\n"
				+ "<value>${queueName}</value>" + "\n" + "</property>" + "\n"
				+ "</configuration>" + "\n" + "<main-class>" + mainClass
				+ "</main-class>"
				+ "\n"
				+ // TODO
				"<arg>" + "-eee " + arg + "</arg>" + "\n" + "</java>" + "\n"
				+ "<ok to=\"" + ok + "\"/>" + "\n" + "<error to=\"fail\"/>"
				+ "\n" + "</action>";
		return actionXML;
	}

}
