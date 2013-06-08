package haflow.hdfs.client;

import haflow.configuration.helper.ConfigurationHelper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.BlockLocation;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HdfsHelper {

	private FileSystem hdfs;
	private ConfigurationHelper clusterConfHelper;
	
	public ConfigurationHelper getClusterConfHelper() {
		return clusterConfHelper;
	}

	public void setClusterConfHelper(ConfigurationHelper clusterConfHelper) {
		this.clusterConfHelper = clusterConfHelper;
	}

	@Autowired
	public HdfsHelper(ConfigurationHelper clusterConfHelper) {
		this.clusterConfHelper = clusterConfHelper;
		try {
			Configuration conf = new Configuration();
			conf.set(ConfigurationHelper.FS_DEFAULT_NAME,
					this.clusterConfHelper
							.getProperty(ConfigurationHelper.FS_DEFAULT_NAME));
//			conf.set("fs.default.name", "hdfs://m150:9000");
			hdfs = FileSystem.get(conf);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public boolean putFile(String srcFile, String dstFile) {
		try {
			Path srcPath = new Path(srcFile);
			Path dstPath = new Path(dstFile);
			hdfs.copyFromLocalFile(false, true, srcPath, dstPath);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deleteFolder(String dir) {
		Path folderPath = new Path(dir);
		try {
			hdfs.delete(folderPath, true);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public void readFile(String filePath) {
		try {
			FSDataInputStream stream = hdfs.open(new Path(filePath));
			BufferedReader br = new BufferedReader(new InputStreamReader(
					stream, "UTF-8"));
			String line = br.readLine();
			for (int i = 0; i < 15 && line != null; i++) {
				System.out.println(line);
				line = br.readLine();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public FSDataOutputStream createFile(String FileName) {
		try {
			Path path = new Path(FileName);
			FSDataOutputStream outputStream = hdfs.create(path);
			return outputStream;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<String[]> getFileBolckHost(String FileName) {
		try {
			List<String[]> list = new ArrayList<String[]>();
			Path path = new Path(FileName);
			FileStatus fileStatus = hdfs.getFileStatus(path);

			BlockLocation[] blkLocations = hdfs.getFileBlockLocations(
					fileStatus, 0, fileStatus.getLen());

			int blkCount = blkLocations.length;
			for (int i = 0; i < blkCount; i++) {
				String[] hosts = blkLocations[i].getHosts();
				list.add(hosts);
			}
			return list;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void closeHdfs() {
		try {
			if (hdfs != null)
				hdfs.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws IOException {
//		final String filePath = "hdfs://m150:9000/ztest/split/part-r-00000";
		// final String newFile = "hdfs://m150:9000/ztest/test/part-r-00000";
//
//		HdfsHelper reader = new HdfsHelper();
//		reader.readFile(filePath);
	}
}
