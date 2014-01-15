package haflow.engine.oozie;

import haflow.util.ClusterConfiguration;
import haflow.util.OozieJobConfiguration;

import java.util.Properties;

import org.apache.oozie.client.OozieClient;
import org.apache.oozie.client.OozieClientException;
import org.apache.oozie.client.WorkflowJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OozieService {
	
	private final String APP_PATH;
	private final String OOZIE_URL;
	private OozieClient oozieClient;
	
	private OozieJobConfiguration oozieJobConfiguration;
	
	@Autowired
	private void setOozieJobConfiguration(
			OozieJobConfiguration oozieJobConfiguration) {
		this.oozieJobConfiguration = oozieJobConfiguration;
	}

	@Autowired
	public OozieService(ClusterConfiguration clusterConfiguration) {
		this.APP_PATH = clusterConfiguration.getProperty(ClusterConfiguration.WORKSPACE_HDFS);
		this.OOZIE_URL = clusterConfiguration.getProperty(ClusterConfiguration.OOZIE_URL);
		oozieClient = new OozieClient(OOZIE_URL);
	}

	public String runJob(String flowName) {
		Properties conf = oozieClient.createConfiguration();
		conf.setProperty(OozieClient.APP_PATH, APP_PATH + flowName);
		
		Properties oozieJobConfsFromFiles = this.oozieJobConfiguration.getProperties();
		for( String key : oozieJobConfsFromFiles.stringPropertyNames()){
			conf.setProperty(key, oozieJobConfsFromFiles.getProperty(key));
		}
//		conf.setProperty("nameNode", "hdfs://m150:9000");
//		conf.setProperty("jobTracker", "m150:9001");
//		conf.setProperty("queueName", "default");
//		conf.setProperty("examplesRoot", "examples");
//		conf.setProperty("oozie.use.system.libpath", "true");
//		conf.setProperty("oozie.libpath", "share/lib/hive");

		String jobId = null;
		try {
			jobId = oozieClient.run(conf);
			// System.out.println("Workflow job submitted! Id:" + jobId);
		} catch (OozieClientException e) {
			e.printStackTrace();
		}

		return jobId;
	}

	public static void main(String[] args) throws OozieClientException,
			InterruptedException {

		// get a OozieClient for local Oozie
		OozieClient wc = new OozieClient("http://m150:11000/oozie/");

		// create a workflow job configuration
		Properties conf = wc.createConfiguration();
		// set the workflow application path
		conf.setProperty(OozieClient.APP_PATH,
				"hdfs://m150:9000/user/root/examples/apps/race_random_forest2");//z-java-module

		// setting workflow parameters
		conf.setProperty("nameNode", "hdfs://m150:9000");
		conf.setProperty("jobTracker", "m150:9001");
		conf.setProperty("queueName", "default");
		conf.setProperty("examplesRoot", "examples");
		conf.setProperty("oozie.use.system.libpath", "true");

		// submit and start the workflow job
		String jobId = wc.run(conf);
		System.out.println("Workflow job submitted! Id:" + jobId);

		// wait until the workflow job finishes
		// printing the status every 10 seconds
		while (wc.getJobInfo(jobId).getStatus() == WorkflowJob.Status.RUNNING) {
			System.out.println("Workflow job running ...");
			Thread.sleep(10 * 1000);
		}

		// print the final status o the workflow job
		System.out.println("Workflow job completed ...");
		System.out.println(wc.getJobInfo(jobId));

	}

}
