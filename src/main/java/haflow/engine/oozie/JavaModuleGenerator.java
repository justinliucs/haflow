package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class JavaModuleGenerator extends OozieXmlGenerator {

	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		try {
			String name = configurations.get("name");
			String arg = configurations.get("arg");
			String ok = configurations.get("ok");
			String mainClass = configurations.get("mainClass");
			String xml = "<action name=\"" + name + "\">" + "\n" + "<java>"
					+ "\n" + "<job-tracker>${jobTracker}</job-tracker>" + "\n"
					+ "<name-node>${nameNode}</name-node>" + "\n"
					+ "<configuration>" + "\n" + "<property>" + "\n"
					+ "<name>mapred.job.queue.name</name>" + "\n"
					+ "<value>${queueName}</value>" + "\n" + "</property>"
					+ "\n" + "</configuration>" + "\n" + "<main-class>"
					+ mainClass + "</main-class>"
					+ "\n"
					+ // TODO
					"<arg>" + "-eee " + arg + "</arg>" + "\n" + "</java>"
					+ "\n" + "<ok to=\"" + ok + "\"/>" + "\n"
					+ "<error to=\"fail\"/>" + "\n" + "</action>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
