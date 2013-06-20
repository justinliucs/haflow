package haflow.engine.oozie;

import haflow.entity.Node;

import java.util.Map;

import org.w3c.dom.Document;

public abstract class OozieXmlGenerator {
	public abstract Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs);
}
