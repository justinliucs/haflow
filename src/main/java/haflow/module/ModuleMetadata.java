package haflow.module;

import haflow.entity.Node;

import java.util.Map;

import org.w3c.dom.Document;

public interface ModuleMetadata {
	public Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs);
}
