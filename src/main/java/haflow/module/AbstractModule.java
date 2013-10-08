package haflow.module;

import java.util.Map;

public abstract class AbstractModule {
	public abstract boolean validate(Map<String, String> configurations,
			Map<String, String> inputs, Map<String, String> outputs);
}
