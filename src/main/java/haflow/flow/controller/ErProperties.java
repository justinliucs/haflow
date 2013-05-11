package haflow.flow.controller;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@XmlRootElement
public class ErProperties {

	private String jarPath;
	private String inputPath;
	private String outputPath;
	private String confPath;
	
	@XmlElement
	public String getJarPath() {
		return jarPath;
	}
	public void setJarPath(String jarPath) {
		this.jarPath = jarPath;
	}
	@XmlElement
	public String getInputPath() {
		return inputPath;
	}
	public void setInputPath(String inputPath) {
		this.inputPath = inputPath;
	}
	@XmlElement
	public String getOutputPath() {
		return outputPath;
	}
	public void setOutputPath(String outputPath) {
		this.outputPath = outputPath;
	}
	@XmlElement
	public String getConfPath() {
		return confPath;
	}
	public void setConfPath(String confPath) {
		this.confPath = confPath;
	}
	
	@JsonIgnore
	public String toString(){
		return "jarPath:" + jarPath + "; " + "inputPath:" + inputPath + "; " + "outputPath: " + outputPath + "; " + "confPath: " + confPath + ";";
	}
}
