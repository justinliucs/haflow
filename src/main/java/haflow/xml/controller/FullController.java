package haflow.xml.controller;

import haflow.util.xml.FlowType;
import haflow.util.xml.Project;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.net.URISyntaxException;
import java.net.URL;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/full")
public class FullController {

	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public  @ResponseBody Project getFlow() {
		URL url = FullController.class.getClassLoader().getResource("full.xml"); 
		Project flow = null;
		try {
			File file = new File(url.toURI().getPath());
			JAXBContext jaxbContext = JAXBContext.newInstance(Project.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			flow = (Project) jaxbUnmarshaller.unmarshal(file);
			System.out.println(file.getPath());
		} catch (URISyntaxException e1) {
			e1.printStackTrace();
		}catch (JAXBException e) {
			e.printStackTrace();
		}
		return flow;
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public  @ResponseBody Project saveFlow(@RequestBody Project project) {
		System.out.println(project.toString());
		try {
			URL url = FullController.class.getClassLoader()
				.getResource("popo.xml"); 
			
			JAXBContext jc = JAXBContext.newInstance(project.getClass());
			Marshaller m = jc.createMarshaller();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			File file = new File(url.toURI().getRawPath());
			String savePath = file.getParent() + "\\full2" + ".xml";
			m.marshal(project, new FileOutputStream(savePath));
			System.out.println(savePath);
		} catch (JAXBException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return project;
	}
	
	@RequestMapping(value = "/run/{flowId}", method = RequestMethod.POST)
	public  @ResponseBody RunFlowMessage runFlow(@RequestBody Project project, @PathVariable String flowId) {
//		System.out.println(project.toString());
		System.out.println("Running " + flowId);
		
		StringBuilder sb = new StringBuilder();
		sb.append("Running " + flowId + "\n");
		
		FlowType theFlow = findFlowById(project, flowId);
		if( theFlow != null){
			sb.append("\t" + FlowExecutor.executeFlow(theFlow));
		}else{
			sb.append("\t" + "Can not find flow " + flowId);
		}
		RunFlowMessage message = new RunFlowMessage();
		message.setMessage(sb.toString());
		return message;
	}
	
	public FlowType findFlowById(Project project, String flowId){
		for( int i = 0; i < project.getItems().size(); i++){
			FlowType f = project.getItems().get(i);
			if(f.getId()[0].equals(flowId)){
				return f;
			}
		}
		return null;
	}
}
