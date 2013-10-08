package haflow.engine.oozie;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.channels.FileChannel;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class FlowDeployService {

	public boolean deployFlowLocal(String deployPath, String workflowXml,
			Set<String> jarPaths) {

		this.rmr(new File(deployPath));
		this.saveXmlToFlow(workflowXml, deployPath);

		for (String jarPath : jarPaths) {
			if (jarPath.endsWith(".jar")) {
				File jarFile = new File(jarPath);
				File dstPath = new File(deployPath + "/lib");
				System.out.println(jarPath);
				this.copyJarFile(jarFile, dstPath, jarFile.getName());
			}
		}

		return true;
	}

	private long copyJarFile(File srcFile, File dstPath, String dstName) {
		File dst = new File(dstPath, dstName);
		if (!srcFile.exists()) {
			System.out.println(srcFile.getAbsolutePath() + " do not exist!");
		} else if (dst.exists()) {
			System.out.println(dst.getAbsolutePath() + " already exists!");
		} else {
			if (!dstPath.exists()) {
				boolean made = mkdir(dstPath);
				if (made)
					System.out
							.println("create dir" + dstPath.getAbsolutePath());
			}

			// start copy file
			try {
				@SuppressWarnings("resource")
				FileChannel ifc = new FileInputStream(srcFile).getChannel();
				@SuppressWarnings("resource")
				FileChannel ofc = new FileOutputStream(dst).getChannel();
				long inSize = ifc.size();
				ifc.transferTo(0, inSize, ofc);
				ifc.close();
				ofc.close();
				return inSize;
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}

	private boolean saveXmlToFlow(String xml, String filePath) {
		File dir = new File(filePath);
		mkdir(dir);
		OutputStreamWriter fw;
		try {
			fw = new OutputStreamWriter(new FileOutputStream(new File(filePath,
					"workflow.xml")));
			fw.write(xml);
			fw.close();
			return true;
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	private boolean rmr(File dir) {
		if (dir != null && dir.exists()) {
			if (dir.isDirectory()) {
				File[] subs = dir.listFiles();
				for (File sub : subs) {
					rmr(sub);
				}
				return dir.delete();
			} else if (dir.isFile()) {
				return dir.delete();
			}
		}
		return true;
	}

	private boolean mkdir(File dir) {
		if (!dir.exists()) {
			boolean made = dir.mkdirs();
			if (made) {
				System.out.println("made dir " + dir.getAbsolutePath());
			} else {
				System.err.println("failed to make dir "
						+ dir.getAbsolutePath());
				return false;
			}
		}
		return true;
	}
}
