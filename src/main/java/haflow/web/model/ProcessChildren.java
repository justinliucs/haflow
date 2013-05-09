package haflow.web.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ProcessChildren {
	private String _reference;
	
    public ProcessChildren(){}
	public ProcessChildren(String _reference) {
	
		this._reference = _reference;
	}
	
	public String get_reference() {
		return _reference;
	}
	public void set_reference(String reference) {
		_reference = reference;
	}

	

}
