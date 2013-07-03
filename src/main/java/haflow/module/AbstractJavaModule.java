package haflow.module;

import java.util.List;
import java.util.Map;


public abstract class AbstractJavaModule extends AbstractModule{
	
	public abstract String getMainClass();
	
	public List<String> getArguments(Map<String, String> configurations){
//		StringBuilder sb = new StringBuilder();
//		for(String key : configurations.keySet()){
//			sb.append("--" + key + " \"" + configurations.get(key) + "\" ");
//		}
//		return sb.toString();
		return null;
	}
}
