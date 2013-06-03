package haflow.module;

import java.util.Map;

import org.w3c.dom.Document;

public interface ModuleMetadata {
	public Document generate(Map<String, String> configurations);
}
