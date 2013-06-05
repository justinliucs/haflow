package haflow.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;

import org.springframework.stereotype.Component;

@Component
public class FlowDeployService {

	public long copyJarFile(File srcFile, File dstPath, String dstName){
		File dst = new File(dstPath, dstName);
		if(!srcFile.exists()){
			System.out.println(srcFile.getAbsolutePath() + " do not exist!");
		}else if( !dstPath.exists()){
			System.out.println(dstPath.getAbsolutePath() + " do not exist!");
		}else if(dst.exists()){
			System.out.println(dst.getAbsolutePath() + " already exists!");
		}else{
			//start copy file
			try {
				@SuppressWarnings("resource")
				FileChannel ifc = new FileInputStream(srcFile).getChannel();
				@SuppressWarnings("resource")
				FileChannel ofc = new FileOutputStream(dst).getChannel();
				long inSize = ifc.size();
				ifc.transferTo(0, inSize, ofc);
				ifc.close();
				ofc.close();
				return inSize;
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return 0;
	}
}
