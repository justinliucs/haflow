package haflow.utility;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class ConfigurationHelper {

	public static final String WORKSPACE_HDFS= "workspace_hdfs";
	public static final String WORKSPACE_LOCAL = "workspace_local";
	
	public static final String 	FS_DEFAULT_NAME = "fs.default.name";
	
	private Properties properties; 
	
	public ConfigurationHelper() {
		this.loadClusterConf();
	}

	private void loadClusterConf() {
		ClassLoader loader = ConfigurationHelper.class.getClassLoader();
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

	public String getProperty(String key){
		if( properties != null){
			return properties.getProperty(key);
		}
		return null;
	}
	
	public static void main(String[] args) {
//		ConfigurationHelper h = new ConfigurationHelper();
//		Properties prp = h.loadClusterConf();
//		for( Object key : prp.keySet()){
//			System.out.println(key.toString() + " = " + prp.getProperty(key.toString()).toString());
//		}
		
		URLClassLoader classLoader = (URLClassLoader) Thread
				.currentThread().getContextClassLoader();
		URL[] urls = classLoader.getURLs();
		for (URL url : urls) {
			System.out.println(url.getPath());
		}
	}

}
