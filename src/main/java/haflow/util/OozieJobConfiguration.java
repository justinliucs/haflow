package haflow.util;

import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class OozieJobConfiguration {
	private static final String GLOBAL_CONFIGURATION_FILE_NAME = "oozie.job.properties";
	private Properties properties;
	
	public OozieJobConfiguration(){
		this.loadProperties();
	}
	private Properties loadProperties() {
//		Properties properties;
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
	
	public Properties getProperties(){
		return this.properties;
	}
}
