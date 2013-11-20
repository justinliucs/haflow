package haflow.engine.oozie;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class StartModuleGenerateHelper {
	
	public static Document generate(String to){
		try {
			String xml = "<start to=\"" + to + "\"/>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
