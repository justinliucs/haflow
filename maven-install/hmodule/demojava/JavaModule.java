package hmodule.demojava;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

@Module(id = "ada600a8-aa63-968a-ca46-9085e0e0bd2e", name = "Java", category = "General")
@ModuleConfiguration(configurationKeys = { "eee" }, configurationDisplayNames = { "fff" })
public class JavaModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		String name = configurations.get("name");
		String eee = configurations.get("eee");
		String ok = configurations.get("ok");
		
		Class<?> moduleClass = this.getClass();
		assert (moduleClass.isAnnotationPresent(haflow.module.Module.class));
//		String moduleName = moduleClass.getAnnotation(haflow.module.Module.class).name();
		
		String actionXML = 
			"<action name=\"" + name + "\">" + "\n" +
		        "<java>" + "\n" +
		            "<job-tracker>${jobTracker}</job-tracker>" + "\n" +
		            "<name-node>${nameNode}</name-node>" + "\n" +
		            "<configuration>" + "\n" +
		                "<property>" + "\n" +
		                    "<name>mapred.job.queue.name</name>" + "\n" +
		                    "<value>${queueName}</value>" + "\n" +
		                "</property>" + "\n" +
		            "</configuration>" + "\n" +
		            "<main-class>" + DemoJavaMain.class.getName() + "</main-class>" + "\n" +//TODO
		            "<arg>" + "-eee " + eee + "</arg>" + "\n" +
		        "</java>" + "\n" +
		        "<ok to=\"" + ok + "\"/>" + "\n" +	
		        "<error to=\"fail\"/>" + "\n" +
		    "</action>";
			
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			StringReader sr = new StringReader(actionXML);
			InputSource is = new InputSource(sr);
			Document doc = db.parse(is);
			return doc;
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}
