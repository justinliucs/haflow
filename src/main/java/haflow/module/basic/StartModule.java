package haflow.module.basic;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleEndpoint;
import haflow.module.ModuleMetadata;
import haflow.utility.XmlHelper;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

@Module(id = "a208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start", category = "Basic", configurations = {}, inputs = {}, outputs = { @ModuleEndpoint(name = "to", maxNumber = 1, minNumber = 1) })
public class StartModule implements ModuleMetadata {

	private XmlHelper xmlHelper = XmlHelper.getInstance();

	public static void main(String[] args) {
		StartModule z = new StartModule();
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

	// TODO: Fix it
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// <start to="java-node"/>
		String ok = configurations.get("ok");

		String xml = "<start to=\"" + ok + "\"/>";
		return this.xmlHelper.getDocument(xml);
	}

}
