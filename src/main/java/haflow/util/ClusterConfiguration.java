package haflow.util;

import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class ClusterConfiguration {
	private static final String PROERTIES_FILE_NAME = "cluster.properties";
	
	public static final String OOZIE_URL = "oozie_url";
	public static final String WORKSPACE_LOCAL = "workspace_local";
	public static final String WORKSPACE_HDFS = "workspace_hdfs";
	public static final String MIDDLE_DATA_HDFS = "middle_data_hdfs";
	
	public static final String FS_DEFAULT_NAME = "fs.default.name";
	

	private Properties properties;

	public ClusterConfiguration() {
		ClassLoader loader = ClusterConfiguration.class.getClassLoader();
		URL url = loader.getResource(ClusterConfiguration.PROERTIES_FILE_NAME);
		this.properties = new Properties();
		try {
			FileInputStream inputFile = new FileInputStream(url.getFile());
			this.properties.load(inputFile);
			inputFile.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getProperty(String key) {
		return this.properties.getProperty(key);
	}
}
