package haflow.test;

import haflow.service.HdfsService;
import haflow.utility.ClusterConfiguration;

import org.apache.hadoop.fs.FileStatus;
import org.junit.Test;

public class HdfsServiceTest {
	@Test
	public void test() {
		HdfsService service = new HdfsService();
		service.setClusterConfiguration(new ClusterConfiguration());
		FileStatus[] status = service
				.listFile("hdfs://m150:9000/user/root/examples/apps/bundle");
		for (FileStatus s : status) {
			System.out.println(s.getPath().getName() + " " + s.getLen());
		}
	}
}
