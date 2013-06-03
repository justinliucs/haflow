package haflow.module.basic;

import java.util.Map;

import org.w3c.dom.Document;

import haflow.module.ModuleMetadata;
import haflow.module.annotation.Module;
import haflow.module.annotation.ModuleConfiguration;

@Module(id = "70d027c3-a4bd-61b5-5063-134ff71f8122", name = "End")
@ModuleConfiguration(configurationKeys = { "aaa" }, configurationDisplayNames = { "bbb" })
public class EndModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		// TODO Auto-generated method stub
		return null;
	}

}
