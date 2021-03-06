package haflow.engine.oozie;

import haflow.dto.entity.Node;

import java.util.List;
import java.util.Map;

import org.w3c.dom.Document;

public abstract class OozieNodeXmlGenerator {
	public abstract Document generate(Map<String, String> configurations,
			Map<String, Node> inputs, Map<String, Node> outputs, List<String> arguments);
}
