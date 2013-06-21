package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.Map;

import org.w3c.dom.Document;

public class JavaModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub

		String name = configurations.get("name");
		String arg = configurations.get("arg");
		String ok = configurations.get("ok");
		String mainClass = configurations.get("mainClass");

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
		return null;
	}

}
