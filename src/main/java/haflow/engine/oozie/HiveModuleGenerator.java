package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.tools.ant.filters.StringInputStream;
import org.w3c.dom.Document;

public class HiveModuleGenerator extends OozieXmlGenerator {

	public static final String JOB_TRACKER = "job-tracker";
	public static final String NAME_NODE = "name-node";
	
//	public static final String PREPARE = "prepare";
//	public static final String JOB_XML = "job_xml";
	
	public static final String MAPRED_JOB_QUEUE_NAME = "mapred.job.queue.name";
	public static final String OOZIE_USER_SYSTEM_LIBPATH = "oozie.use.system.libpath";


	@Override
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs, List<String> arguments) {
		try {
			String name = configurations.get("name");

			String job_tracker = configurations.get(JOB_TRACKER);
			String name_node = configurations.get(NAME_NODE);
			String queue_name = configurations.get(MAPRED_JOB_QUEUE_NAME);
			
			String sql = configurations.get("sql_file");
//			String output = configurations.get("output_dir");
			
			String ok = outputs.get("ok").getName();
			String error = outputs.get("error").getName();
			
			String main_class = "haflow.module.zrace.HiveJdbcClient";
			
			String uri = configurations.get("oozie.hive.connection.url");
			
			String xml = "<action name=\"" + name + "\">" + 
			        "<java xmlns=\"uri:oozie:hive-action:0.2\">" + 
			        "<job-tracker>" + job_tracker + "</job-tracker>" + "\n"
					+ "<name-node>" + name_node + "</name-node>" + "\n"
					+ "<configuration>" + "\n" + "<property>" + "\n"
					+ "<name>mapred.job.queue.name</name>" + "\n"
					+ "<value>" + queue_name + "</value>" + "\n" + "</property>"
					+ "\n" + "</configuration>" +
			        "<main-class>" + main_class + "</main-class>" + 
			        "<arg>" + uri + "</arg>" +
			        "<arg>" + sql + "</arg>" +
			        "</java>" 
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
