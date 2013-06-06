package haflow.hdfs.client;

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
import org.apache.hadoop.io.IOUtils;
import org.springframework.stereotype.Component;

/**
 * Read top 10 lines, from files on hadoop
 * 
 * @author ZhaoWei
 * 
 */
@Component
public class HdfsHelper {
	public static final String filePath = "hdfs://m150:9000/ztest/split/part-r-00000";
	public static final String newFile = "hdfs://m150:9000/ztest/test/part-r-00000";
	

	private FileSystem hdfs;
	
	public static void main(String[] args) throws IOException {
		HdfsHelper reader = new HdfsHelper();
		reader.ReadFile(filePath);
	}

	public HdfsHelper(){
		try {
			Configuration conf = new Configuration();
			hdfs = FileSystem.get(conf);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void ReadFile(String filePath) {
		try {
			FSDataInputStream stream = hdfs.open(new Path(filePath));
			BufferedReader br = new BufferedReader(new InputStreamReader(stream,
					"UTF-8"));
			String line = br.readLine();
			for (int i = 0; i < 15 && line != null; i++) {
				System.out.println(line);
				line = br.readLine();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public FSDataOutputStream CreateFile(String FileName) {
		try {
			Path path = new Path(FileName);
			FSDataOutputStream outputStream = hdfs.create(path);
			return outputStream;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<String[]> GetFileBolckHost(String FileName) {
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

	public void PutFile( String srcFile, String dstFile) {
		try {
			Path srcPath = new Path(srcFile);
			Path dstPath = new Path(dstFile);
			hdfs.copyFromLocalFile(false, true, srcPath, dstPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void ReadFile(Configuration conf, String FileName) {
		try {
			FileSystem hdfs = FileSystem.get(conf);
			FSDataInputStream dis = hdfs.open(new Path(FileName));
			IOUtils.copyBytes(dis, System.out, 4096, false);
			dis.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void closeHdfs(){
		try {
			if( hdfs != null)
				hdfs.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
