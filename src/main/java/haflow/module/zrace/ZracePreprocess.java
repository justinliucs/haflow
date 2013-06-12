package haflow.module.zrace;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@Module(id = "6e744dc4-edc6-eca2-07d5-28ff55a75b2d", name = "Preprocess", category = "zrace", configurations = {
		@ModuleConfiguration(key = "input_path", displayName = "input path"),
		@ModuleConfiguration(key = "output_path", displayName = "output path") }, inputs = {}, outputs = {})
public class ZracePreprocess implements ModuleMetadata {
	public static void main(String[] args) {
		ZracePreprocess z = new ZracePreprocess();
		Map<String, String> configurations = new HashMap<String, String>();
		configurations.put("input_path", "asdfasdfa");
		configurations.put("output_path", "ddddddddddd");
		// TODO: Fix it
		Document doc = null;// z.generate(configurations);
		System.out.println(doc.toString());

		NodeList nodes = doc.getChildNodes();
		for (int i = 0; i < nodes.getLength(); i++) {
			System.out.println(nodes.item(i).getNodeName());
		}

		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer t;
		try {
			t = tf.newTransformer();
			t.setOutputProperty("encoding", "UTF-8");// 解决中文问题，试过用GBK不行，GB23121
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			t.transform(new DOMSource(doc), new StreamResult(bos));
			String xmlStr = bos.toString();
			System.out.println(xmlStr);
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		}
	}

	public ZracePreprocess() {
		// System.out.println(this.getClass().getName());
	}

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
