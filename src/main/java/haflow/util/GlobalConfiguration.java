package haflow.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GlobalConfiguration {

	private Properties properties;

	public static final String JOB_TRACKER = "job-tracker";
	public static final String NAME_NODE = "name-node";
	public static final String MAPRED_JOB_QUEUE_NAME = "mapred.job.queue.name";
	public static final String OOZIE_USER_SYSTEM_LIBPATH = "oozie.use.system.libpath";
	public static final String UPLOAD_PATH = "/upload";

	private Map<String, String> map;

	@Autowired
	public GlobalConfiguration(ClusterConfiguration cc) {
		this.map = new HashMap<String, String>();
		map.put(JOB_TRACKER, cc.getProperty(JOB_TRACKER));
		map.put(NAME_NODE, cc.getProperty(NAME_NODE));
		map.put(MAPRED_JOB_QUEUE_NAME, cc.getProperty(MAPRED_JOB_QUEUE_NAME));
		map.put(OOZIE_USER_SYSTEM_LIBPATH,
				cc.getProperty(OOZIE_USER_SYSTEM_LIBPATH));

		properties = new Properties();
		properties.put(JOB_TRACKER, cc.getProperty(JOB_TRACKER));
		properties.put(NAME_NODE, cc.getProperty(NAME_NODE));
		properties.put(MAPRED_JOB_QUEUE_NAME,
				cc.getProperty(MAPRED_JOB_QUEUE_NAME));
		properties.put(OOZIE_USER_SYSTEM_LIBPATH,
				cc.getProperty(OOZIE_USER_SYSTEM_LIBPATH));
	}

	public String getConfiguration(String key) {
		return this.properties.getProperty(key);
	}

	public Map<String, String> getProperties() {
		return this.map;
	}
}
