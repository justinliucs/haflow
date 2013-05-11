package haflow.flow.controller;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonIgnore;

@XmlRootElement
public class Position {
	private double x;
	private double y;
	@XmlElement
	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	@XmlElement
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
	
	@JsonIgnore
	public String toString(){
		return "x=" + x + "; " + "y=" + y + ";";
	}
}
