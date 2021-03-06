package haflow.service;

import haflow.util.ClusterConfiguration;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.tools.ant.filters.StringInputStream;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HdfsService {
	private ClusterConfiguration clusterConfiguration;

	private ClusterConfiguration getClusterConfiguration() {
		return clusterConfiguration;
	}

	@Autowired
	private void setClusterConfiguration(
			ClusterConfiguration clusterConfiguration) {
		this.clusterConfiguration = clusterConfiguration;
	}

	private FileSystem getFileSystem() throws IOException {
		Configuration conf = new Configuration();
		conf.set(
				ClusterConfiguration.FS_DEFAULT_NAME,
				this.getClusterConfiguration().getProperty(
						ClusterConfiguration.FS_DEFAULT_NAME));
		conf.set("user.name", "root");
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
	
	public boolean createDirectory(String remotePath, String directoryname) {
		try {
			FileSystem fs = this.getFileSystem();
			System.out
					.println("service:"+(fs==null));
			fs.mkdirs(new Path(remotePath+"/"+directoryname));
			fs.close();
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
	
	public FSDataInputStream readPicture(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FSDataInputStream hdfsInStream = fs.open(new Path(remotePath));
			return hdfsInStream;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String readCsvFile(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FSDataInputStream hdfsInStream = fs.open(new Path(remotePath));
			BufferedReader d=new BufferedReader(new InputStreamReader(hdfsInStream));
			String s;
//			String[] col=new String[12];
//			String[] value=new String[12];
//			Vector col=new Vector();
//			Vector value=new Vector();
			JSONArray arr=new JSONArray();
			JSONObject obj=new JSONObject();

			arr.put(obj);
			if ((s=d.readLine())!=null)
			{
				String[] value=s.split(",");
				String[] col=new String[value.length];
				obj.put("length",value.length);
				JSONObject jobj=new JSONObject();
				for(int i=0;i<value.length;i++){			
					col[i]=value[i];
					String s1=""+i;
					jobj.put(s1,col[i]);
				}
				arr.put(jobj);
			int line=0;
			while (((s=d.readLine())!=null)&&(line<=9)){
				line++;
				value=s.split(",");
				JSONObject jobj1=new JSONObject();
				for(int j=0;j<value.length;j++){			
					jobj1.put(col[j], value[j]);
				}
				arr.put(jobj1);			    	
			}
			d.close();
			System.out.println(arr.toString());
			}
			else
			{
				
			}
			return arr.toString();
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
	
    public boolean movefile(String fromPath,String toPath,String filename){  
        FileSystem fs;
		try {
			fs = this.getFileSystem();
		} catch (IOException e) {
			e.printStackTrace();
			return false;			
		}
        String localPath = "/home/tmp";  
        File dirPath = new File(localPath);  
        if (!dirPath.exists()) {  
            dirPath.mkdirs();  
            System.out.print(localPath);
        }  
        else
        	System.out.print(localPath);
        Path fromhdfsPath = new Path(fromPath);
        Path tmpPath = new Path(localPath);
        Path tohdfsPath = new Path(toPath);
        try {
			fs.moveToLocalFile (fromhdfsPath, tmpPath);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} 
        try {
			fs.moveFromLocalFile (tmpPath, tohdfsPath);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
        return true;
    }

	public List<List<String>> getCsvColumnData(String formatedPath) {
		List<List<String>> results = new ArrayList<List<String>>();
		try {
			FileSystem fs = this.getFileSystem();
			FSDataInputStream hdfsInStream = fs.open(new Path(formatedPath));
			BufferedReader d = new BufferedReader(new InputStreamReader(
					hdfsInStream));			
			String line;
			if ((line = d.readLine()) != null) {
				List<String> header = new ArrayList<String>();
				String[] value = line.split(",");
				int columnNumber = value.length;
				for (int i = 0; i < columnNumber; i++) {
					header.add(value[i]);
				}
				results.add(header);
				for (int lineCount = 0; ((line = d.readLine()) != null) && (lineCount <= 9); lineCount++) {
					List<String> result = new ArrayList<String>();
					value = line.split(",");
					for (int j = 0; j < columnNumber; j++) {
						result.add(value[j]);
					}
					results.add(result);
				}
				d.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return results;
//		try {
//			FileSystem fs = this.getFileSystem();
//			FSDataInputStream hdfsInStream = fs.open(new Path(formatedPath));
//			BufferedReader d = new BufferedReader(new InputStreamReader(
//					hdfsInStream));
//			String line;
//			JSONArray arr = new JSONArray();
//			JSONObject obj = new JSONObject();
//
//			arr.put(obj);
//			if ((line = d.readLine()) != null) {
//				String[] value = line.split(",");
//				int columnNumber = value.length;
//				String[] col = new String[columnNumber];
//				obj.put("length", columnNumber);
//				JSONObject jobj = new JSONObject();
//				for (int i = 0; i < columnNumber; i++) {
//					col[i] = value[i];
//					String s1 = "" + i;
//					jobj.put(s1, col[i]);
//				}
//				arr.put(jobj);
//				int lineCount = 0;
//				while (((line = d.readLine()) != null) && (lineCount <= 9)) {
//					lineCount++;
//					value = line.split(",");
//					JSONObject jobj1 = new JSONObject();
//					for (int j = 0; j < columnNumber; j++) {
//						jobj1.put(col[j], value[j]);
//					}
//					arr.put(jobj1);
//				}
//				d.close();
//				System.out.println(arr.toString());
//			}
//			return arr.toString();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
	}

}
