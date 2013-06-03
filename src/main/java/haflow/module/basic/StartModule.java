package haflow.module.basic;

import java.util.Map;

import org.w3c.dom.Document;

import haflow.module.ModuleMetadata;
import haflow.module.annotation.Module;
import haflow.module.annotation.ModuleConfiguration;

@Module(id = "9208d7d2-a8ff-2493-64c2-36f50bc95752", name = "Start")
@ModuleConfiguration(configurationKeys = { "aaa" }, configurationDisplayNames = { "bbb" })
public class StartModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		// TODO Auto-generated method stub
		return null;
	}

}
