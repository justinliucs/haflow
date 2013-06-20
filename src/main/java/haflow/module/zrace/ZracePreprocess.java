package haflow.module.zrace;

import haflow.entity.Node;
import haflow.module.Module;
import haflow.module.ModuleConfiguration;
import haflow.module.AbstractModule;

import java.util.Map;

@Module(id = "6e744dc4-edc6-eca2-07d5-28ff55a75b2d", name = "Preprocess", category = "zrace", configurations = {
		@ModuleConfiguration(key = "input_path", displayName = "input path"),
		@ModuleConfiguration(key = "output_path", displayName = "output path") }, inputs = {}, outputs = {})
public class ZracePreprocess extends AbstractModule {

	@Override
	public boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs) {
		// TODO Auto-generated method stub
		return false;
	}

}
