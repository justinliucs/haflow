package haflow.service;

import haflow.utility.ClusterConfiguration;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
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

	private Configuration getDefaultConfiguration() {
		Configuration conf = new Configuration();
		this.getClusterConfiguration();
		this.getClusterConfiguration();
		conf.set(
				ClusterConfiguration.FS_DEFAULT_NAME,
				this.getClusterConfiguration().getProperty(
						ClusterConfiguration.FS_DEFAULT_NAME));
		return conf;
	}

	public boolean uploadFile(String localPath, String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
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
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
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
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
			fs.copyToLocalFile(new Path(remotePath), new Path(localPath));
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public String readFile(String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
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
			fs.close();
			return ret;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public boolean appendFile(String content, String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
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

	public boolean deleteFile(String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
			fs.delete(new Path(remotePath), false);
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean deleteDirectory(String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
			fs.delete(new Path(remotePath), true);
			fs.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean renameFile(String fromPath, String toPath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
			return fs.rename(new Path(fromPath), new Path(toPath));
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public FileStatus[] listFile(String remotePath) {
		try {
			FileSystem fs = FileSystem.get(this.getDefaultConfiguration());
			FileStatus[] fileList = fs.listStatus(new Path(remotePath));
			fs.close();
			return fileList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
