package haflow.flow.controller;

import haflow.web.controller.ProcessController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/flow")
public class EntryJsonController {

	@RequestMapping(value = "/run", method = RequestMethod.POST)
	public  @ResponseBody EntryBeanJson runFlow(@RequestBody EntryBeanJson entry) {
		System.out.println(entry);
		entry.setConsole("console console console");
		return executeFlow(entry);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public  @ResponseBody FlowJson saveFlow(@RequestBody FlowJson flow) {
		System.out.println(flow.toString());
		try {
			URL url = EntryJsonController.class.getClassLoader()
				.getResource("popo.xml"); 
			
			JAXBContext jc = JAXBContext.newInstance(flow.getClass());
			Marshaller m = jc.createMarshaller();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			File file = new File(url.toURI().getRawPath());
			String savePath = file.getParent() + "\\flow" + ".xml";
			m.marshal(flow, new FileOutputStream(savePath));
			System.out.println(savePath);
		} catch (JAXBException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return flow;
	}
	
	@RequestMapping(value = "/open", method = RequestMethod.GET)
	public  @ResponseBody FlowJson getFlow() {
		URL url = EntryJsonController.class.getClassLoader().getResource("flow.xml"); 
		FlowJson flow = null;
		try {
			File file = new File(url.toURI().getPath());
			JAXBContext jaxbContext = JAXBContext.newInstance(FlowJson.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			flow = (FlowJson) jaxbUnmarshaller.unmarshal(file);
			System.out.println(file.getPath());
		} catch (URISyntaxException e1) {
			e1.printStackTrace();
		}catch (JAXBException e) {
			e.printStackTrace();
		}
		return flow;
	}
	
	private EntryBeanJson executeFlow(EntryBeanJson entryBean){
		StringBuilder message = new StringBuilder();
		try {
			Process p = Runtime.getRuntime().exec(entryBean.toString());
			p.waitFor();
			
			//Error Stream
			BufferedReader reader = new BufferedReader(new InputStreamReader(p
					.getErrorStream()));
			String line = reader.readLine();
			if( line != null)
				message.append("Execute Error Log: \n");
			while (line != null) {
				message.append(line);
				line = reader.readLine();
			}
			reader.close();
			
			//Input Stream
			BufferedReader reader2 = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line2 = reader2.readLine();
			if( line2 != null)
				message.append("Execute Log: \n");
			while (line2 != null) {
				message.append(line2);
				line2 = reader2.readLine();
			}
			reader2.close();
			
			entryBean.setConsole(message.toString());
		} catch (IOException e1) {
			e1.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return entryBean;
	}
	
}
