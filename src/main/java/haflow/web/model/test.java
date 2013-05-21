package haflow.web.model;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

public class test {

	/**
	 * @param args
	 * @throws URISyntaxException 
	 * 
	 * 
	 */
    public void play() throws URISyntaxException
    {
    	ProcessJson processJson = new ProcessJson();
		processJson.setIdentifier("id");
		processJson.setLabel("name");
		ProcessParentItem pitem1 = new ProcessParentItem("pp1", "A工程",
				"process");
		ProcessParentItem pitem2 = new ProcessParentItem("pp2", "B工程",
				"process");
		ProcessParentItem citem1 = new ProcessParentItem("cp1", "c工程子文件",
				"fprocess");
		ProcessParentItem citem2 = new ProcessParentItem("cp2", "d工程子文件",
				"fprocess");
		ProcessParentItem citem3 = new ProcessParentItem("cp3", "e工程子文件",
				"fprocess");
		ProcessParentItem citem4 = new ProcessParentItem("cp4", "f工程子文件",
				"fprocess");
		ProcessParentItem citem5 = new ProcessParentItem("cp5", "g工程子文件",
				"fprocess");
	    ProcessChildren pc1=new ProcessChildren("cp1");
	    ProcessChildren pc2=new ProcessChildren("cp2");
	    ProcessChildren pc3=new ProcessChildren("cp3");
	    ProcessChildren pc4=new ProcessChildren("cp4");
	    ProcessChildren pc5=new ProcessChildren("cp5");
	    pitem1.addChild(pc1);
	    pitem1.addChild(pc2);
	    pitem1.addChild(pc3);
	    pitem2.addChild(pc4);
	    pitem2.addChild(pc5);
		processJson.addItem(pitem1);
		processJson.addItem(pitem2);
		processJson.addItem(citem1);
		processJson.addItem(citem2);
		processJson.addItem(citem3);
		
		try {
			URL url = this.getClass().getClassLoader().getResource("config.xml");  
			//File file = new File("D:\\config.xml");
			File file=new File(url.toURI().getPath());
			JAXBContext jaxbContext = JAXBContext
					.newInstance(ProcessJson.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

			// output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
			jaxbMarshaller.marshal(processJson, System.out);

//			jaxbMarshaller.marshal(processJson, new FileOutputStream(file));
		
		//	JAXBContext jaxbContext = JAXBContext.newInstance(ProcessJson.class);
	 
			//Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
		//	ProcessJson processJson2 = (ProcessJson) jaxbUnmarshaller.unmarshal(inputStream);
			System.out.println("ok");
			//System.out.println(customer);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
    }
	public static void main(String[] args) throws URISyntaxException {
		new test().play();
		

	}
}
