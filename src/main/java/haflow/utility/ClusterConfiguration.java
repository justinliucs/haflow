package haflow.utility;

import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class ClusterConfiguration {
	private static final String PROERTIES_FILE_NAME = "cluster.properties";
	public static final String WORKSPACE_HDFS = "workspace_hdfs";
	public static final String WORKSPACE_LOCAL = "workspace_local";
	public static final String FS_DEFAULT_NAME = "fs.default.name";

	private Properties properties;

	private Properties getProperties() {
		return properties;
	}

	private void setProperties(Properties properties) {
		this.properties = properties;
	}

	public ClusterConfiguration() {
		this.loadClusterConf();
	}

	private void loadClusterConf() {
		ClassLoader loader = ClusterConfiguration.class.getClassLoader();
		URL url = loader.getResource(ClusterConfiguration.PROERTIES_FILE_NAME);
		this.setProperties(new Properties());
		try {
			FileInputStream inputFile = new FileInputStream(url.getFile());
			this.getProperties().load(inputFile);
			inputFile.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getProperty(String key) {
		return this.getProperties().getProperty(key);
	}
}
