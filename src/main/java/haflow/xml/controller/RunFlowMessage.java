package haflow.xml.controller;

public class RunFlowMessage {
	private String message;

	public RunFlowMessage(String message) {
		super();
		this.message = message;
	}
	
	public RunFlowMessage() {
		super();
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
