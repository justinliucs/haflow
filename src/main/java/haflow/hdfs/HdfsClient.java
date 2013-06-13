package haflow.hdfs;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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
import org.springframework.stereotype.Component;

@Component
public class HdfsClient {
	public boolean upload(String localPath, String remotePath) {
		try {
			InputStream in = new BufferedInputStream(new FileInputStream(
					localPath));
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create(remotePath), conf);
			OutputStream out = fs.create(new Path(remotePath));
			IOUtils.copyBytes(in, out, 4096, true);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean download(String localPath, String remotePath) {
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create(remotePath), conf);
			FSDataInputStream hdfsInStream = fs.open(new Path(remotePath));
			OutputStream out = new FileOutputStream(localPath);
			byte[] ioBuffer = new byte[1024];
			int readLen = hdfsInStream.read(ioBuffer);
			while (-1 != readLen) {
				out.write(ioBuffer, 0, readLen);
				readLen = hdfsInStream.read(ioBuffer);
			}
			out.close();
			hdfsInStream.close();
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean append(String remotePath, String content) {
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create(remotePath), conf);
			FSDataOutputStream out = fs.append(new Path(remotePath));
			int readLen = content.getBytes().length;
			while (-1 != readLen) {
				out.write(content.getBytes(), 0, readLen);
			}
			out.close();
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean delete(String remotePath) {
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create(remotePath), conf);
			fs.deleteOnExit(new Path(remotePath));
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	public FileStatus[] listFiles(String remotePath) {
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create(remotePath), conf);
			FileStatus[] fileList = fs.listStatus(new Path(remotePath));
			fs.close();
			return fileList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
