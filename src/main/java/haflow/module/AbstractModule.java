package haflow.module;

import haflow.entity.Node;

import java.util.Map;

public abstract class AbstractModule {
	public abstract boolean validate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs);
}
