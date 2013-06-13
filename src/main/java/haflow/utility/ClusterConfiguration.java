package haflow.utility;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class ClusterConfiguration {

	public static final String WORKSPACE_HDFS = "workspace_hdfs";
	public static final String WORKSPACE_LOCAL = "workspace_local";

	public static final String FS_DEFAULT_NAME = "fs.default.name";

	private Properties properties;

	public ClusterConfiguration() {
		this.loadClusterConf();
	}

	private void loadClusterConf() {
		ClassLoader loader = ClusterConfiguration.class.getClassLoader();
		URL url = loader.getResource("cluster.properties");
		properties = new Properties();
		try {
			FileInputStream inputFile = new FileInputStream(url.getFile());
			properties.load(inputFile);
			inputFile.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getProperty(String key) {
		if (properties != null) {
			return properties.getProperty(key);
		}
		return null;
	}

}
