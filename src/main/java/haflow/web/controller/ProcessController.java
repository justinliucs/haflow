package haflow.web.controller;

import haflow.web.model.ProcessJson;
import haflow.web.model.ProcessParentItem;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URISyntaxException;
import java.net.URL;

import javax.annotation.PreDestroy;
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
@RequestMapping("/helloworld")
public class ProcessController {
	ProcessJson processJson;
	File file;

	public ProcessController() {

		try {
			URL url = ProcessController.class.getClassLoader().getResource(
					"config.xml");
			file = new File(url.toURI().getPath());
			JAXBContext jaxbContext = JAXBContext
					.newInstance(ProcessJson.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			processJson = (ProcessJson) jaxbUnmarshaller.unmarshal(file);
			System.out.println("ok");
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	ProcessJson getShopInJSON() {

		return processJson;

	}

	@RequestMapping(value = "/newItem", method = RequestMethod.POST)
	public @ResponseBody
	ProcessJson saveNewItem(@RequestBody ProcessParentItem newItem) {
		System.out.println("new ITEM *************");
		if (processJson.addItem(newItem))
			System.out.println("添加成功");
		return processJson;

	}

	@RequestMapping(value = "/deleteItem", method = RequestMethod.POST)
	public @ResponseBody
	ProcessJson deleteItem(@RequestBody ProcessParentItem delItem) {
		System.out.println("delete ITEM *************" + delItem.getId());
		if (processJson.removeItem(delItem))
			System.out.println("删除成功");
		return processJson;

	}

	@PreDestroy
	public void cleanUp() throws Exception {
		JAXBContext jaxbContext = JAXBContext.newInstance(ProcessJson.class);
		Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

		// output pretty printed
		jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		jaxbMarshaller.marshal(processJson, System.out);

		jaxbMarshaller.marshal(processJson, new FileOutputStream(file));
		System.out.println("Spring Container is destroy! Customer clean up");

	}
}
