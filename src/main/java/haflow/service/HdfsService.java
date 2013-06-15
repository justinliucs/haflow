package haflow.service;

import haflow.utility.ClusterConfiguration;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.tools.ant.filters.StringInputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HdfsService {
	private ClusterConfiguration clusterConfiguration;

	public ClusterConfiguration getClusterConfiguration() {
		return clusterConfiguration;
	}

	@Autowired
	public void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}

	private FileSystem getFileSystem() throws IOException {
		Configuration conf = new Configuration();
		this.getClusterConfiguration();
		this.getClusterConfiguration();
		conf.set(
				ClusterConfiguration.FS_DEFAULT_NAME,
				this.getClusterConfiguration().getProperty(
						ClusterConfiguration.FS_DEFAULT_NAME));
		return FileSystem.get(conf);
	}

	public boolean uploadFile(String localPath, String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			fs.copyFromLocalFile(new Path(localPath), new Path(remotePath));
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean writeFile(String content, String remotePath) {
		try {
			InputStream in = new BufferedInputStream(new StringInputStream(
					content));
			FileSystem fs = this.getFileSystem();
			OutputStream out = fs.create(new Path(remotePath));
			IOUtils.copyBytes(in, out, 4096, true);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean downloadFile(String localPath, String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			fs.copyToLocalFile(new Path(remotePath), new Path(localPath));
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public String readFile(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FSDataInputStream hdfsInStream = fs.open(new Path(remotePath));
			OutputStream out = new ByteArrayOutputStream();
			byte[] ioBuffer = new byte[1024];
			int readLen = hdfsInStream.read(ioBuffer);
			while (-1 != readLen) {
				out.write(ioBuffer, 0, readLen);
				readLen = hdfsInStream.read(ioBuffer);
			}
			out.close();
			String ret = out.toString();
			hdfsInStream.close();
			return ret;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public boolean appendFile(String content, String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FSDataOutputStream out = fs.append(new Path(remotePath));
			int readLen = content.getBytes().length;
			while (-1 != readLen) {
				out.write(content.getBytes(), 0, readLen);
			}
			out.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean deleteFile(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			return fs.delete(new Path(remotePath), false);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean deleteDirectory(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			return fs.delete(new Path(remotePath), true);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean renameFile(String fromPath, String toPath) {
		try {
			FileSystem fs = this.getFileSystem();
			return fs.rename(new Path(fromPath), new Path(toPath));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public FileStatus[] listFile(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FileStatus[] fileList = fs.listStatus(new Path(remotePath));
			return fileList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
