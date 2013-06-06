package haflow.utility;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

import org.springframework.stereotype.Component;

@Component
public class ClassHelper {

	public List<String> getClassNames(String packageName,
			boolean searchInChildPackage) {
		try {
			List<String> classNames = new ArrayList<String>();
			URLClassLoader classLoader = (URLClassLoader) Thread
					.currentThread().getContextClassLoader();
			URL[] urls = classLoader.getURLs();
			for (URL url : urls) {
				if (url.getProtocol().equals("file")) {
					File file = new File(url.getFile());
					String root = file.getPath();
					if (file.isDirectory()) {
						classNames.addAll(this.getClassNamesFromDirectory(root,
								packageName, searchInChildPackage, file, true));
					} else if (file.getName().endsWith(".jar")) {
						classNames.addAll(this.getClassNameFromJar(packageName,
								searchInChildPackage, file));
					}
				}
			}
			return classNames;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private List<String> getClassNamesFromDirectory(String root,
			String packageName, boolean searchInChildPackage, File directory,
			boolean continueSearch) {
		List<String> classNames = new ArrayList<String>();
		File[] files = directory.listFiles();
		for (File file : files) {
			if (file.isDirectory()) {
				if (searchInChildPackage || continueSearch) {
					boolean needToContinue = continueSearch;
					if (file.getPath().endsWith(packageName.replace(".", "/"))) {
						needToContinue = needToContinue & false;
					}
					classNames.addAll(this.getClassNamesFromDirectory(root,
							packageName, searchInChildPackage, file,
							needToContinue));
				}
			} else {
				if (file.getPath().endsWith(".class")) {
					String classFileName = file.getPath().replace(root + "/",
							"");
					if (classFileName.startsWith(packageName.replace(".", "/"))) {
						String className = classFileName.substring(0,
								classFileName.length() - ".class".length())
								.replace("/", ".");
						classNames.add(className);
					}
				}
			}
		}
		return classNames;
	}

	private List<String> getClassNameFromJar(String packageName,
			boolean searchInChildPackage, File file) {
		List<String> classNames = new ArrayList<String>();
		JarFile jarFile = null;
		try {
			jarFile = new JarFile(file);
			Enumeration<JarEntry> jarEntries = jarFile.entries();
			while (jarEntries.hasMoreElements()) {
				JarEntry jarEntry = jarEntries.nextElement();
				String entryName = jarEntry.getName();
				if (entryName.endsWith(".class")) {
					String packagePath = packageName.replace(".", "/") + "/";
					if (searchInChildPackage) {
						if (entryName.startsWith(packagePath)) {
							entryName = entryName.replace("/", ".").substring(
									0, entryName.lastIndexOf("."));
							classNames.add(entryName);
						}
					} else {
						int index = entryName.lastIndexOf("/");
						String entryPath;
						if (index != -1) {
							entryPath = entryName.substring(0, index);
						} else {
							entryPath = entryName;
						}
						if (entryPath.equals(packagePath)) {
							entryName = entryName.replace("/", ".").substring(
									0, entryName.lastIndexOf("."));
							classNames.add(entryName);
						}
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (jarFile != null) {
				try {
					jarFile.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return classNames;
	}
}
