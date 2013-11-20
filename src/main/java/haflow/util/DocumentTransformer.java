package haflow.util;

import java.io.ByteArrayOutputStream;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;

public class DocumentTransformer {
	public static String transfromFromDocumentToString(Document doc){
		if( doc == null ){
			System.err.println("Null document/n");
			return "";
		}
		TransformerFactory transFactory = TransformerFactory.newInstance();
		Transformer transformer;
		try {
			transformer = transFactory.newTransformer();
			transformer.setOutputProperty(
					OutputKeys.OMIT_XML_DECLARATION, "YES");
			DOMSource domSource = new DOMSource(doc);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			transformer.transform(domSource, new StreamResult(bos));
			return bos.toString();
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		}
		return "";
	}
}
