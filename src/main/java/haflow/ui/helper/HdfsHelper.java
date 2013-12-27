package haflow.ui.helper;


import haflow.service.HdfsService;
import haflow.ui.model.CsvColumnModel;
import haflow.ui.model.HdfsFileListItemModel;
import haflow.ui.model.HdfsFileListModel;
import haflow.ui.model.HdfsFileModel;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HdfsHelper {
	private HdfsService hdfsService;

	private HdfsService getHdfsService() {
		return hdfsService;
	}

	@Autowired
	private void setHdfsService(HdfsService hdfsService) {
		this.hdfsService = hdfsService;
	}

	public HdfsFileListModel getFileList(String path) {
		HdfsFileListModel model = new HdfsFileListModel();
		model.setFiles(new ArrayList<HdfsFileListItemModel>());
		FileStatus[] status = this.getHdfsService().listFile(path);
		if (status != null) {
			for (FileStatus stat : status) {
				HdfsFileListItemModel file = new HdfsFileListItemModel();
				file.setName(stat.getPath().getName());
				file.setLength(stat.getLen());
				file.setDirectory(stat.isDir());
				file.setTime(new Timestamp(stat.getModificationTime()).toString());
				model.getFiles().add(file);
			}
		}
		return model;

	}

	public HdfsFileModel getFile(String path, String fileName) {
		HdfsFileModel model = new HdfsFileModel();
		String filePath = path + "/" + fileName;
		String ret = this.getHdfsService().readFile(filePath);
		if (ret != null) {
			model.setContent(ret);
			model.setLength(ret.length());
		}
		model.setPath(filePath);
		model.setFilename(fileName);
		return model;
	}
	
	public FSDataInputStream getPicture(String path, String fileName) {
		String filePath = path + "/" + fileName;
		return this.getHdfsService().readPicture(filePath);
	}
	
	public HdfsFileModel getCsvFile(String path) {
		HdfsFileModel model = new HdfsFileModel();
		String ret = this.getHdfsService().readCsvFile(path);
		if (ret != null) {
			model.setContent(ret);
			model.setLength(ret.length());
		}
		model.setPath(path);
		return model;
	}
	
	public Boolean uploadFile(String localpath,String remotePath) {
		Boolean ret = this.getHdfsService().uploadFile(localpath,remotePath);
		return ret;
	}
	public Boolean downloadFile(String localpath,String remotePath) {
		Boolean ret = this.getHdfsService().downloadFile(localpath,remotePath);
		return ret;
	}
	public boolean createdirectory(String remotePath,String directoryname) {
		boolean ret=this.getHdfsService().createDirectory(remotePath,directoryname);
		return ret;
	}
	public boolean deletedirectory(String remotePath) {
		boolean ret=this.getHdfsService().deleteDirectory(remotePath);
		return ret;
	}
	
	public boolean deletefile(String remotePath) {
		boolean ret=this.getHdfsService().deleteFile(remotePath);
		return ret;
	}
	public boolean rename(String path,String newpath) {
		boolean ret=this.getHdfsService().renameFile(path,newpath);
		System.out.println("helper:"+ret);
		return ret;
	}
	public boolean movefile(String fromPath,String toPath,String filename) {
		boolean ret=this.getHdfsService().renameFile(fromPath,toPath);
		System.out.println("movefile:"+ret);
		return ret;
	}

	public CsvColumnModel getCsvColumnData(String formatedPath, int column_index) {
		List<List<String>> table = this.getHdfsService().getCsvColumnData(formatedPath);
		CsvColumnModel ccm = new CsvColumnModel();
		List<Double> columnData = new ArrayList<Double>();
		for( int i = 0; i < table.size(); i++){
			List<String> lineData = table.get(i);
			if( lineData.size() > column_index && column_index >= 0){
				if( i == 0){
					ccm.setColumnname(lineData.get(column_index));
				}else{
					columnData.add(Double.valueOf(lineData.get(column_index)));
				}
			}else{
				ccm.setMessage("Wrong Column Index!");
				ccm.setSuccess(false);
				return ccm;
			}				
		}
		ccm.setData(columnData);
		ccm.setMessage("Load successfully!");
		ccm.setSuccess(true);
		return ccm;
	}
}
