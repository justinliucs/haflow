package haflow.ui.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "position")
public class PositionModel {
	private int left;
	private int top;

	@XmlElement
	public int getLeft() {
		return left;
	}

	public void setLeft(int left) {
		this.left = left;
	}

	@XmlElement
	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

}
