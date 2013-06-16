package haflow.module.zrace;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

import java.util.Map;

@Module(id = "6e744dc4-edc6-eca2-07d5-28ff55a75b2d", name = "Preprocess", category = "zrace", configurations = {
		@ModuleConfiguration(key = "input_path", displayName = "input path"),
		@ModuleConfiguration(key = "output_path", displayName = "output path") }, inputs = {}, outputs = {})
public class ZracePreprocess implements ModuleMetadata {

	// TODO: Fix it
	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		String inputPath = configurations.get("input_path");
		String outputPath = configurations.get("output_path");

		Class<?> moduleClass = this.getClass();
		assert (moduleClass.isAnnotationPresent(haflow.module.Module.class));
		String moduleName = moduleClass.getAnnotation(
				haflow.module.Module.class).name();

		String actionXML = "<action name=\"" + moduleName + "\">" + "\n"
				+ "<java>" + "<job-tracker>${jobTracker}</job-tracker>" + "\n"
				+ "<name-node>${nameNode}</name-node>" + "\n"
				+ "<configuration>" + "\n" + "<property>" + "\n"
				+ "<name>mapred.job.queue.name</name>" + "\n"
				+ "<value>${queueName}</value>" + "\n" + "</property>" + "\n"
				+ "</configuration>" + "\n" + "<main-class>"
				+ this.getClass().getName() + "</main-class>" + "\n" + "<arg>"
				+ inputPath + "</arg>" + "\n" + "<arg>" + outputPath + "</arg>"
				+ "\n" + "</java>" + "\n" +
				// "<ok to=\"end\"/>" + "\n" + //TODO
				"<error to=\"fail\"/>" + "\n" + "</action>";
		return actionXML;
	}

}
