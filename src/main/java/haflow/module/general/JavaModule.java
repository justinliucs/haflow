package haflow.module.general;

import java.util.Map;

import org.w3c.dom.Document;

import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.ModuleMetadata;

@Module(id = "5da600a8-aa63-968a-ca46-9085e0e0bd2e", name = "Java", category = "General")
@ModuleConfiguration(configurationKeys = { "eee" }, configurationDisplayNames = { "fff" })
public class JavaModule implements ModuleMetadata {

	public Document generate(Map<String, String> configurations) {
		// TODO Auto-generated method stub
		return null;
	}

}
