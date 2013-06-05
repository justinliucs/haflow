package haflow.hdfs.client;

import haflow.module.general.JavaModule;

import java.io.File;


public class TestClassPath {
	public static void main(String[] args) {
		String path = JavaModule.class.getProtectionDomain().getCodeSource().getLocation().getFile();
		File jarFile = new File(path);
		System.out.println(path);
	}
}
