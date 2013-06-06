package haflow.hdfs.client;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

public class HdfsStaticHelper {

	public static void main(String[] args) {
//		try {
//			uploadTohdfs();
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		};
		
		PutFile("D:/haflow/flows/NewFlow", "hdfs://m150:9000/ztest/test1");
	}

	public static void uploadTohdfs() throws FileNotFoundException, IOException {
		String localSrc = "D:/haflow/flows/NewFlow/workflow.xml";
		String dst = "hdfs://m150:9000/ztest/test/newflow";
		InputStream in = new BufferedInputStream(new FileInputStream(localSrc));
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create(dst), conf);
		OutputStream out = fs.create(new Path(dst), new Progressable() {
			public void progress() {
				System.out.println(".");
			}
		});
		System.out.println("finised uploading!");
		IOUtils.copyBytes(in, out, 4096, true);
	}

	public static void PutFile( String srcFile, String dstFile) {
		
		FileSystem hdfs;
		
		Configuration conf = new Configuration();
		try {
			hdfs = FileSystem.get(conf);
			Path srcPath = new Path(srcFile);
			Path dstPath = new Path(dstFile);
			hdfs.copyFromLocalFile(srcPath, dstPath);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	
	public static void readHdfs() throws FileNotFoundException, IOException {
		String dst = "hdfs://192.168.1.11:9000/usr/yujing/test.txt";
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create(dst), conf);
		FSDataInputStream hdfsInStream = fs.open(new Path(dst));

		OutputStream out = new FileOutputStream("d:/qq-hdfs.txt");
		byte[] ioBuffer = new byte[1024];
		int readLen = hdfsInStream.read(ioBuffer);

		while (-1 != readLen) {
			out.write(ioBuffer, 0, readLen);
			readLen = hdfsInStream.read(ioBuffer);
		}
		System.out.println("finished reading!");
		out.close();
		hdfsInStream.close();
		fs.close();
	}

	/**
	 * 以append方式将内容添加到HDFS上文件的末尾;注意：文件更新，需要在hdfs-site.xml中添
	 * <property>
	 * <name>dfs.append.support</name>
	 * <value>true</value>
	 * </property>
	 */
	public static void appendToHdfs() throws FileNotFoundException, IOException {
		String dst = "hdfs://192.168.1.11:9000/usr/yujing/test.txt";
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create(dst), conf);
		FSDataOutputStream out = fs.append(new Path(dst));

		int readLen = "zhangzk add by hdfs java api".getBytes().length;

		while (-1 != readLen) {
			out.write("zhangzk add by hdfs java api".getBytes(), 0, readLen);
		}
		out.close();
		fs.close();
	}

	public static void deleteFromHdfs() throws FileNotFoundException,
			IOException {
		String dst = "hdfs://192.168.1.11:9000/usr/yujing";
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create(dst), conf);
		fs.deleteOnExit(new Path(dst));
		fs.close();
	}

	/** 遍历HDFS上的文件和目录 */
	public static void getDirectoryFromHdfs() throws FileNotFoundException,
			IOException {
		String dst = "hdfs://192.168.1.11:9000/usr/yujing";
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create(dst), conf);
		FileStatus fileList[] = fs.listStatus(new Path(dst));
		int size = fileList.length;
		for (int i = 0; i < size; i++) {
			System.out.println("文件名name:" + fileList[i].getPath().getName()
					+ "文件大小/t/tsize:" + fileList[i].getLen());
		}
		fs.close();
	}
}
