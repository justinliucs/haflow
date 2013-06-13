package haflow.module.zrace;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@Module(id = "6e744dc4-edc6-eca2-07d5-28ff55a75b2d", name = "Preprocess", category = "zrace", configurations = {
		@ModuleConfiguration(key = "input_path", displayName = "input path"),
		@ModuleConfiguration(key = "output_path", displayName = "output path") }, inputs = {}, outputs = {})
public class ZracePreprocess implements ModuleMetadata {

	// TODO: Fix it
	public Document generate(Map<String, String> configurations,
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

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			StringReader sr = new StringReader(actionXML);
			InputSource is = new InputSource(sr);
			Document doc = db.parse(is);
			return doc;
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}

		return null;
	}

}
