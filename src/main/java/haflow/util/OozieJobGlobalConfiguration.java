package haflow.util;

import java.io.FileInputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class OozieJobGlobalConfiguration {

	private static final String GLOBAL_CONFIGURATION_FILE_NAME = "oozie.job.global.properties";
	
	public static final String JOB_TRACKER = "job-tracker";
	
	public static final String NAME_NODE = "name-node";
	public static final String MAPRED_JOB_QUEUE_NAME = "mapred.job.queue.name";
	
	public static final String OOZIE_USER_SYSTEM_LIBPATH = "oozie.use.system.libpath";
	public static final String OOZIE_HIVE_CONNECTION_URL = "oozie.hive.connection.url";
	public static final String OOZIE_HIVE_CONNECTION_NAME = "oozie.hive.connection.name";
	public static final String OOZIE_HIVE_CONNECTION_PWD = "oozie.hive.connection.password";

	private Map<String, String> map;
	
	private Properties loadProperties() {
		Properties properties;
		ClassLoader loader = ClusterConfiguration.class.getClassLoader();
		URL url = loader.getResource(GLOBAL_CONFIGURATION_FILE_NAME);
		properties = new Properties();
		try {
			FileInputStream inputFile = new FileInputStream(url.getFile());
			properties.load(inputFile);
			inputFile.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return properties;
	}
	
//	@Autowired
	public OozieJobGlobalConfiguration() {
		Properties cc = this.loadProperties();
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