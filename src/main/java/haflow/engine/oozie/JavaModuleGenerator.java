package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class JavaModuleGenerator extends OozieXmlGenerator {

	public static final String JOB_TRACKER = "job-tracker";
	public static final String NAME_NODE = "name-node";
	
//	public static final String PREPARE = "prepare";
//	public static final String JOB_XML = "job_xml";
	public static final String MAIN_CLASS = "main_class";
	public static final String JAVA_OPT = "java_opt";
	public static final String ARG = "arg";	
	
	public static final String MAPRED_JOB_QUEUE_NAME = "mapred.job.queue.name";
	public static final String OOZIE_USER_SYSTEM_LIBPATH = "oozie.use.system.libpath";
	
	
	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		try {
			String name = configurations.get("name");

			String job_tracker = configurations.get(JOB_TRACKER);
			String name_node = configurations.get(NAME_NODE);
			String queue_name = configurations.get(MAPRED_JOB_QUEUE_NAME);
			
			String main_class = configurations.get(MAIN_CLASS);
//			String java_opt = configurations.get(JAVA_OPT);
			String argument = configurations.get(ARG);
			
			String ok = outputs.get("ok").getName();
			String error = outputs.get("error").getName();
			
			String xml = "<action name=\"" + name + "\">" + "\n" + "<java>"
					+ "\n" + "<job-tracker>" + job_tracker + "</job-tracker>" + "\n"
					+ "<name-node>" + name_node + "</name-node>" + "\n"
					+ "<configuration>" + "\n" + "<property>" + "\n"
					+ "<name>mapred.job.queue.name</name>" + "\n"
					+ "<value>" + queue_name + "</value>" + "\n" + "</property>"
					+ "\n" + "</configuration>" + "\n" + "<main-class>"
					+ main_class + "</main-class>" + "\n"
					+ "<arg>" + argument + "</arg>" + "\n" + "</java>"
					+ "\n" + "<ok to=\"" + ok + "\"/>" + "\n"//ok
					+ "<error to=\"" +error + "\"/>" + "\n" + "</action>";
			return DocumentBuilderFactory.newInstance().newDocumentBuilder()
					.parse(new StringInputStream(xml));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
