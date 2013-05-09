package haflow.web.controller;

import org.hibernate.validator.constraints.NotEmpty;

public class HiveBean {

	@NotEmpty
	private String jarPath;
	
	@NotEmpty
	private String hiveSql;

	@NotEmpty
	private String outPath;

	public String getJarPath() {
		return jarPath;
	}


	public void setJarPath(String jarPath) {
		this.jarPath = jarPath;
	}


	public String getHiveSql() {
		return hiveSql;
	}


	public void setHiveSql(String hiveSql) {
		this.hiveSql = hiveSql;
	}


	public String getOutPath() {
		return outPath;
	}


	public void setOutPath(String outPath) {
		this.outPath = outPath;
	}


	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("java -jar " + jarPath + " \"" + hiveSql + "\" " + outPath);
		
		return sb.toString();
	}
}
