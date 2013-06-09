package haflow.module.basic;

import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;

@Module(id = "b0d027c3-a4bd-61b5-5063-134ff71f8123", name = "Kill", category = "Basic", configurations = {
		@ModuleConfiguration(key = "eee", displayName = "fff"),
		@ModuleConfiguration(key = "ggg", displayName = "hhh") }, inputs = {
		@ModuleEndpoint(name = "iii", minNumber = 1, maxNumber = 1),
		@ModuleEndpoint(name = "jjj", minNumber = 1, maxNumber = 1) }, outputs = {
		@ModuleEndpoint(name = "kkk", minNumber = 1, maxNumber = 1),
		@ModuleEndpoint(name = "lll", minNumber = 1, maxNumber = 1) })
public class KillModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		String name = configurations.get("name");
		String xml = "<kill name=\""
				+ name
				+ "\"><message>Work flow failed, error message[${wf:errorMessage(wf:lastErrorNode())}]</message></kill>";

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			StringReader sr = new StringReader(xml);
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
