package haflow.utility;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@Component
public class XmlHelper {
	private DocumentBuilderFactory dbf;
	private DocumentBuilder documentBuilder;

	private TransformerFactory tf;
	private Transformer transform;

	private static XmlHelper instance;
	public static XmlHelper getInstance(){
		if(instance == null){
			instance = new XmlHelper();
		}
		return instance;
	}
	
	public XmlHelper() {
		dbf = DocumentBuilderFactory.newInstance();
		try {
			documentBuilder = dbf.newDocumentBuilder();
		} catch (ParserConfigurationException e1) {
			e1.printStackTrace();
		}

		tf = TransformerFactory.newInstance();
		try {
			transform = tf.newTransformer();
			transform.setOutputProperty("encoding", "UTF-8");
			transform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		}
	}

	public String getXmlString(Document doc) {
		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			transform.transform(new DOMSource(doc), new StreamResult(bos));
			String xmlStr = bos.toString();
			return xmlStr;
		} catch (TransformerException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Document getDocument(String xml) {
		try {
			StringReader sr = new StringReader(xml);
			InputSource is = new InputSource(sr);
			Document doc = documentBuilder.parse(is);
			return doc;
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
