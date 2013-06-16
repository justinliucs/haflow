package haflow.service;

import java.util.Properties;

import org.apache.oozie.client.OozieClient;
import org.apache.oozie.client.OozieClientException;
import org.apache.oozie.client.WorkflowJob;
import org.springframework.stereotype.Component;

@Component
public class OozieService {

	private final String APP_PATH = "hdfs://m150:9000/user/root/examples/apps/";
	private OozieClient wc;

	public OozieService() {
		wc = new OozieClient("http://m150:11000/oozie/");
	}

	public String runJob(String flowName) {
		Properties conf = wc.createConfiguration();
		conf.setProperty(OozieClient.APP_PATH, APP_PATH + flowName);
		conf.setProperty("nameNode", "hdfs://m150:9000");
		conf.setProperty("jobTracker", "m150:9001");
		conf.setProperty("queueName", "default");
		conf.setProperty("examplesRoot", "examples");
		conf.setProperty("oozie.use.system.libpath", "true");

		String jobId = null;
		try {
			jobId = wc.run(conf);
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
				"hdfs://m150:9000/user/root/examples/apps/z-java-module");

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
