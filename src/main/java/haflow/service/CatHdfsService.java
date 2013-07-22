package haflow.service;

import haflow.util.ClusterConfiguration;

import java.io.*;
import java.lang.String;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CatHdfsService {
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
		return FileSystem.get(conf);
	}

	public String readFile(String remotePath) {
		try {
			FileSystem fs = this.getFileSystem();
			FSDataInputStream hdfsInStream = fs.open(new Path(remotePath));
			BufferedReader d=new BufferedReader(new InputStreamReader(hdfsInStream));
			String s;
			String[] col=new String[10];
			String[] value=new String[10];
			JSONArray arr=new JSONArray();
			int i=0;
			while ((s=d.readLine())!=null) {
				if(s.startsWith("@ATTRIBUTE"))
				{
					col[i]=(s.split("\\s+"))[1];
					i++;
							}
				if(s.startsWith("@DATA"))
					break;
			}		
			while ((s=d.readLine())!=null&&!(s.startsWith("%"))){
				value=s.split(",");
				JSONObject jobj=new JSONObject();
				for(int j=0;j<value.length;j++){
					jobj.put(col[j], value[j]);
				}
				arr.put(jobj);			    	
			}
			d.close();
			System.out.println(arr.toString());
			return arr.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
