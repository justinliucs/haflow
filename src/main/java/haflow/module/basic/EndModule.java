package haflow.module.basic;

import java.util.Map;

import org.w3c.dom.Document;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

@Module(id = "70d027c3-a4bd-61b5-5063-134ff71f8122", name = "End", category = "Basic")
@ModuleConfiguration(configurationKeys = { "ccc" }, configurationDisplayNames = { "ddd" })
public class EndModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		// TODO Auto-generated method stub
		return null;
	}

}
