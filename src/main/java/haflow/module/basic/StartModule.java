package haflow.module.basic;

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

@Module(id = "9208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Basic")
@ModuleConfiguration(configurationKeys = { "aaa" }, configurationDisplayNames = { "bbb" })
public class StartModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		//<start to="java-node"/>			
		
		String xml = "<start to=\"java-node\"/>";	
			
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
