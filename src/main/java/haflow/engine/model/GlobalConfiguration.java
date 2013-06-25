package haflow.engine.model;

import haflow.util.ClusterConfiguration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GlobalConfiguration {

	public static final String JOB_TRACKER = "job-tracker";
	public static final String NAME_NODE = "name-node";
	public static final String MAPRED_JOB_QUEUE_NAME = "mapred.job.queue.name";
	public static final String OOZIE_USER_SYSTEM_LIBPATH = "oozie.use.system.libpath";
	public static final String OOZIE_HIVE_CONNECTION_URL = "oozie.hive.connection.url";
	public static final String OOZIE_HIVE_CONNECTION_NAME = "oozie.hive.connection.name";
	public static final String OOZIE_HIVE_CONNECTION_PWD = "oozie.hive.connection.password";

	private Map<String, String> map;

	@Autowired
	public GlobalConfiguration(ClusterConfiguration cc) {
		this.map = new HashMap<String, String>();
		map.put(JOB_TRACKER, cc.getProperty(JOB_TRACKER));
		map.put(NAME_NODE, cc.getProperty(NAME_NODE));
		map.put(MAPRED_JOB_QUEUE_NAME, cc.getProperty(MAPRED_JOB_QUEUE_NAME));
		map.put(OOZIE_USER_SYSTEM_LIBPATH,
				cc.getProperty(OOZIE_USER_SYSTEM_LIBPATH));

		map.put(OOZIE_HIVE_CONNECTION_URL,
				cc.getProperty(OOZIE_HIVE_CONNECTION_URL));
		map.put(OOZIE_HIVE_CONNECTION_NAME,
				cc.getProperty(OOZIE_HIVE_CONNECTION_NAME));
		map.put(OOZIE_HIVE_CONNECTION_PWD,
				cc.getProperty(OOZIE_HIVE_CONNECTION_PWD));
	}

	public Map<String, String> getProperties() {
		return this.map;
	}
}