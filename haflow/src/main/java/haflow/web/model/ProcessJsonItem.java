package haflow.web.model;

public class ProcessJsonItem {
	public String id;
	public String name;
	public String type;
	public ProcessJsonItem(){}
	
	public ProcessJsonItem(String id, String name, String type) {
		
		this.id = id;
		this.name = name;
		this.type = type;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	

}
