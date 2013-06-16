package haflow.module;

import haflow.entity.Node;

import java.util.Map;

public interface ModuleMetadata {
	public String generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs);
}
