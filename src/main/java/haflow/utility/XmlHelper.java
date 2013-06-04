package haflow.utility;

import java.io.ByteArrayOutputStream;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

@Component
public class XmlHelper {

	public void printDocument(Document doc) {
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer t;
		try {
			t = tf.newTransformer();
			t.setOutputProperty("encoding", "UTF-8");
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
}
