package haflow.web.controller;

import org.hibernate.validator.constraints.NotEmpty;

public class EntryBean {

	@NotEmpty
	private String jarPath;

	@NotEmpty
	private String inPath;

	@NotEmpty
	private String outPath;

	@NotEmpty
	private String confPath;

	
	
	public String getJarPath() {
		return jarPath;
	}



	public void setJarPath(String jarPath) {
		this.jarPath = jarPath;
	}



	public String getInPath() {
		return inPath;
	}



	public void setInPath(String inPath) {
		this.inPath = inPath;
	}



	public String getOutPath() {
		return outPath;
	}



	public void setOutPath(String outPath) {
		this.outPath = outPath;
	}



	public String getConfPath() {
		return confPath;
	}



	public void setConfPath(String confPath) {
		this.confPath = confPath;
	}



	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("java -jar " + jarPath + " -itxtPath " + inPath + " -otxtPath "
				+ outPath + " -workPath " + confPath);
		return sb.toString();
	}
}
