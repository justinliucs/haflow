package haflow.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;

import org.apache.log4j.Logger;

public class ModuleJarClassLoader{
	private static Logger logger = Logger.getLogger(ModuleJarClassLoader.class.getName());
	
	public static ClassLoader loadJarClasses(String jarFilePath){
		logger.info("Start loading jar " + jarFilePath);
		try {
			URL url = new URL("file:/" + jarFilePath);
			System.out.println(url.toExternalForm());
			URL[] urls = {url};
			ClassLoader loader = URLClassLoader.newInstance(urls, ModuleJarClassLoader.class.getClassLoader());
			return loader;
		} catch (MalformedURLException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		} 
		return null;
	}

}
