package haflow.module;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class AbstractJavaModule extends AbstractModule {

	public abstract String getMainClass();

	public List<String> getArguments(Map<String, String> configurations) {
		Module module = this.getClass().getAnnotation(Module.class);
		ModuleConfiguration[] confs = module.configurations();

		ModuleEndpoint[] inputs = module.inputs();
		ModuleEndpoint[] outputs = module.outputs();

		List<String> result = new ArrayList<String>();
		for (ModuleEndpoint input : inputs) {
			switch (input.dataType()) {
			case PlainText:
				String textValue = configurations.get(input.name()).trim();
				result.add("--" + input.name());
				result.add(textValue);
				break;
			case None:
			default:
				System.out.println("Invalid Parameters!");
				break;
			}
		}

		for (ModuleEndpoint output : outputs) {
			switch (output.dataType()) {
			case PlainText:
				String textValue = configurations.get(output.name()).trim();
				result.add("--" + output.name());
				result.add(textValue);
				break;
			case None:
			default:
				System.out.println("Invalid Parameters!");
				break;
			}
		}

		for (String key : configurations.keySet()) {
			ModuleConfigurationType confType = getConfigurationType(key, confs);
			switch (confType) {
			case BOOLEAN:
				String boolValue = configurations.get(key);
				if (boolValue.equals("true")) {
					result.add("--" + key);
				}
				break;
			case PLAIN_TEXT:
				String textValue = configurations.get(key).trim();
				if (textValue.length() > 0) {
					result.add("--" + key);
					result.add(configurations.get(key));
				}
				break;
			case TEXT_ARRAY:
				String arrayValue = configurations.get(key).trim();
				if (arrayValue.length() > 0) {
					result.add("--" + key);
					String[] descriptors = arrayValue.split(" ");
					for (String desp : descriptors) {
						result.add(desp);
					}
				}
				break;
			case OTHER:
			default:
				System.out.println("Invalid Parameters!");
				break;
			}
		}
		return result;
	}

	private ModuleConfigurationType getConfigurationType(String key,
			ModuleConfiguration[] confs) {
		for (ModuleConfiguration conf : confs) {
			if (key.equals(conf.key()))
				return conf.type();
		}
		return ModuleConfigurationType.OTHER;
	}
}
