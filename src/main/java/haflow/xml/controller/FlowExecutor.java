package haflow.xml.controller;

import haflow.util.xml.ErModuleType;
import haflow.util.xml.FlowType;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class FlowExecutor {

	public static String executeFlow(FlowType flow){
		StringBuilder message = new StringBuilder();
		try {
			Process p = Runtime.getRuntime().exec(getExecutionCmd(flow));
			p.waitFor();
			
			//Error Stream
			BufferedReader reader = new BufferedReader(new InputStreamReader(p
					.getErrorStream()));
			String line = reader.readLine();
			if( line != null)
				message.append("Execute Error Log: \n");
			while (line != null) {
				message.append(line);
				line = reader.readLine();
			}
			reader.close();
			
			//Input Stream
			BufferedReader reader2 = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line2 = reader2.readLine();
			if( line2 != null)
				message.append("Execute Log: \n");
			while (line2 != null) {
				message.append(line2);
				line2 = reader2.readLine();
			}
			reader2.close();
			
			return message.toString();
		} catch (IOException e1) {
			e1.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return "Something Wrong";
	}
	
	public static String getExecutionCmd(FlowType flow){
		if(flow.getErModule().size() > 0){
			ErModuleType m = flow.getErModule().get(0);
			String jarPath = m.getErProperties().getJarPath();
			String inPath = m.getErProperties().getInputPath();
			String outPath = m.getErProperties().getOutputPath();
			String confPath = m.getErProperties().getConfPath();
			
			StringBuilder sb = new StringBuilder();
			sb.append("java -jar " + jarPath + " -itxtPath " + inPath + " -otxtPath "
					+ outPath + " -workPath " + confPath);
			return sb.toString();
		}else{
			return null;
		}
	}
}
