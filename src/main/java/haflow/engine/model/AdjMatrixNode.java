package haflow.engine.model;

import haflow.dto.entity.Edge;
import haflow.dto.profile.NodeConfiguration;
import haflow.module.ModuleType;

import java.util.List;

public class AdjMatrixNode {
	private int index;
	private String value;//auto
	private Edge path;
	
	public AdjMatrixNode(int index, Edge path) {
		super();
		this.index = index;
		this.path = path;
	}
	
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public Edge getPath() {
		return path;
	}
	public void setPath(Edge path) {
		this.path = path;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public void genValue(String prefix, ModuleType moduleProtype, ModuleType targetModuleType, 
			List<NodeConfiguration> ncps, List<NodeConfiguration> destNcps, String oneInput){
		if( moduleProtype.equals(ModuleType.SOURCE) && targetModuleType.equals(ModuleType.DEST) ){
			System.err.println("Source connected with dest");
			return;
		}
		if( moduleProtype.equals(ModuleType.SOURCE)){
			for( NodeConfiguration ncp : ncps){
				if( ncp.getKey().equals(path.getSourceEndpoint())){
					value = ncp.getValue();
					break;
				}
			}
			if( value == null ){
				System.out.println("erro genValue");//TODO
//				throw new Exception("Null value");
			}
		}else if( moduleProtype.equals(ModuleType.MIDDLE_DATA)){
			this.value = oneInput;
		}else if( targetModuleType.equals(ModuleType.DEST) ){
			for( NodeConfiguration ncp : destNcps){
				if( ncp.getKey().equals(path.getTargetEndpoint())){
					value = ncp.getValue();
					break;
				}
			}
			if( value == null ){
				this.value = null;
				System.out.println("erro genValue");
//				throw new Exception("Null value");
			}
		}else {
			this.value = prefix + "/" + path.getId().toString() + "_" 
				+ path.getSourceNode().getName() + "_" + path.getSourceEndpoint() + "_" 
				+ path.getTargetNode().getName() + "_" + path.getTargetEndpoint();
		}
	}
}
