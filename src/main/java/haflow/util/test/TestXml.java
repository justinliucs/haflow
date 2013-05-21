package haflow.util.test;

//import haflow.discarded.FlowJson;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class TestXml {
//	public static void main(String[] args) {
//		loadXML();
//		saveXML();
//	}
//
//	public static void saveXML() {
//		try {
//			JAXBContext jc = JAXBContext.newInstance(flow.getClass());
//			Marshaller m = jc.createMarshaller();
//			
//			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
//			m.marshal(flow, new FileOutputStream("src/main/resources/po.xml"));
//		} catch (JAXBException e) {
//			e.printStackTrace();
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		}
//	}
//	
//	public static FlowJson flow;
//	public static void loadXML(){
//		try {
//			File file = new File("src/main/resources/flow.xml");
//			JAXBContext jaxbContext = JAXBContext.newInstance(FlowJson.class);
//			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
//			flow = (FlowJson) jaxbUnmarshaller.unmarshal(file);
//			System.out.println(flow.toString());
//		} catch (JAXBException e) {
//			e.printStackTrace();
//		}
//	}
}
