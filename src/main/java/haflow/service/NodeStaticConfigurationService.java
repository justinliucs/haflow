package haflow.service;

import haflow.module.Module;
import haflow.module.ModuleStaticConfiguration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class NodeStaticConfigurationService {
	public Map<String, String> getNodeConfiguration(Class<?> moduleClass) {
		Map<String, String> map = new HashMap<String, String>();
		
		Module module = moduleClass.getAnnotation(Module.class);
		ModuleStaticConfiguration[] sconfs = module.static_configurations();
		for(ModuleStaticConfiguration sconf : sconfs){
			map.put(sconf.key(), sconf.value());
		}
		
		return map;
	}	
	
}
