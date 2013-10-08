package haflow.ui.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import haflow.module.ModuleConfigurationType;
@XmlRootElement(name = "moduleConfiguration")
public class ModuleConfigurationModel {
	private String key;
	private String displayName;
	private String pattern;
	private ModuleConfigurationType type;

	@XmlElement
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	@XmlElement
	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	@XmlElement
	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}
	@XmlElement
	public ModuleConfigurationType getType() {
		return type;
	}

	public void setType(ModuleConfigurationType type) {
		this.type = type;
	}
}
