package haflow.ui.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletResponse;


import haflow.ui.helper.HdfsHelper;
import haflow.ui.model.HdfsFileListModel;
import haflow.ui.model.HdfsFileModel;
import haflow.ui.model.UploadFileModel;
import haflow.ui.model.RemoveHdfsFileModel;
import haflow.ui.model.CreateDirectoryModel;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
//import org.springframework.web.servlet.ModelAndView;
import org.springframework.util.FileCopyUtils;

@Controller
@RequestMapping("/hdfs")
public class HdfsController {
	private HdfsHelper hdfsHelper;

	private HdfsHelper getHdfsHelper() {
		return hdfsHelper;
	}

	@Autowired
	private void setHdfsHelper(HdfsHelper hdfsHelper) {
		this.hdfsHelper = hdfsHelper;
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public UploadFileModel upload(MultipartHttpServletRequest request,@RequestParam(value = "remotePath", required = true) String remotepath){
		System.out.println("begin to upload");
		UploadFileModel model=new UploadFileModel();
		MultipartFile file =(MultipartFile)request.getFile("file");
		try{
	        byte[] bytes=file.getBytes();
	        String uploadDir = "c:\\uploadFile";  
	        File dirPath = new File(uploadDir);  
	        if (!dirPath.exists()) {  
	            dirPath.mkdirs();  
	        }  
	        String sep = System.getProperty("file.separator");  
	        File uploadedFile = new File(uploadDir + sep  
	                + file.getOriginalFilename());  
	        FileCopyUtils.copy(bytes,uploadedFile);    
	        if(this.getHdfsHelper().uploadFile(uploadDir+sep+file.getOriginalFilename(),remotepath)){
	        	
	        	model.setSuccess(true);
	        	model.setMessage("succeed to upload");
	        	model.setFilename(file.getOriginalFilename());
	        	System.out.println("upload success");
	        }
		}
		catch (Exception e) {
		     e.printStackTrace();
		     model.setSuccess(false);
		     model.setMessage("Fail");
		    }
		
		return model;
	}
	@RequestMapping(value = "/download", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<byte[]> download(HttpServletResponse response,@RequestParam(value = "remotepath", required = true) String remotepath,@RequestParam(value = "filename", required = true) String filename){
	    response.setContentType("application/x-download");
	    try {
	        String downloadDir = "c:\\downloadFile";  
	        File dirPath = new File(downloadDir);  
	        if (!dirPath.exists()) {  
	            dirPath.mkdirs();  
	        }  
	        String sep = System.getProperty("file.separator");  
	        String downLoadPath=downloadDir+sep+filename;
	        if(this.getHdfsHelper().downloadFile(downloadDir+sep+filename,remotepath)){	        	
				BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());		
				BufferedInputStream bis = new BufferedInputStream(new FileInputStream(new File(downLoadPath)));
				byte[] buf = new byte[1024];
				int read;
				while((read=bis.read(buf))!=-1){
					bos.write(buf,0,read);
				}
				bos.close();
				bis.close();
	        }
			
	    } catch (IOException e) {
			e.printStackTrace();
		}
	    return null;
	}
	

	
	
	
	@RequestMapping(value = "/createdirectory", method = RequestMethod.GET)
	@ResponseBody
	public CreateDirectoryModel createdirectory(
			@RequestParam("remotepath") String remotePath,@RequestParam("directoryname") String directoryname) throws UnsupportedEncodingException{
		String in_remotePath=remotePath;
		String out_remotePath = new String(in_remotePath.getBytes("iso-8859-1"),"UTF-8");
		String in_directoryname=directoryname;
		String out_directoryname = new String(in_directoryname.getBytes("iso-8859-1"),"UTF-8");
		CreateDirectoryModel model=new CreateDirectoryModel();
		if(this.getHdfsHelper().createdirectory(out_remotePath,out_directoryname))
		{
		     model.setSuccess(true);
		     model.setMessage("Succeed to create");
		     model.setdirectoryname(out_directoryname);
		}
		else
		{
			 model.setSuccess(false);
		     model.setMessage("Fail to create");
		}
			 return model;
			
	}
	


	
	@RequestMapping(value = "/deletedirectory", method = RequestMethod.GET)
	@ResponseBody
	public RemoveHdfsFileModel deletedirectory(
			@RequestParam("remotepath") String remotePath) throws UnsupportedEncodingException{
		String in_remotePath=remotePath;
		String out_remotePath = new String(in_remotePath.getBytes("iso-8859-1"),"UTF-8");
		RemoveHdfsFileModel model=new RemoveHdfsFileModel();
		if(this.getHdfsHelper().deletedirectory(out_remotePath))
		{
		     model.setSuccess(true);
		     model.setMessage("Succeed to delete");
		     System.out.println("Succeed to delete");
		}
		else
		{
			 model.setSuccess(false);
		     model.setMessage("Fail to delete");
		     System.out.println("Fail to delete");
		}
			 return model;
			
	}
	
			@RequestMapping(value = "/deletefile", method = RequestMethod.GET)
			@ResponseBody
			public RemoveHdfsFileModel deletefile(
					@RequestParam("remotepath") String remotePath) throws UnsupportedEncodingException{
				String in_remotePath=remotePath;
				String out_remotePath = new String(in_remotePath.getBytes("iso-8859-1"),"UTF-8");
				RemoveHdfsFileModel model=new RemoveHdfsFileModel();
				if(this.getHdfsHelper().deletefile(out_remotePath))
				{
				     model.setSuccess(true);
				     model.setMessage("Succeed to delete");
				     System.out.println("Succeed to delete");
				}
				else
				{
					 model.setSuccess(false);
				     model.setMessage("Fail to delete");
				     System.out.println("Fail to delete");
				}
					 return model;
					
			}
		
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileListModel get(
			@RequestParam(value = "path", required = true) String path) throws UnsupportedEncodingException {
		String in_path=path;
		String out_path = new String(in_path.getBytes("iso-8859-1"),"UTF-8");
		return this.getHdfsHelper().getFileList(out_path);
	}

	@RequestMapping(value = "/file", method = RequestMethod.GET)
	@ResponseBody
	public HdfsFileModel get(
			@RequestParam(value = "path", required = true) String path,
			@RequestParam(value = "fileName", required = true) String fileName) throws UnsupportedEncodingException {
		String in_path=path;
		String out_path = new String(in_path.getBytes("iso-8859-1"),"UTF-8");
		String in_fileName=fileName;
		String out_fileName = new String(in_fileName.getBytes("iso-8859-1"),"UTF-8");
		return this.getHdfsHelper().getFile(out_path, out_fileName);
	}
}
