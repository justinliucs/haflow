//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.4 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.05.14 at 06:51:44 PM CST 
//


package haflow.util.xml;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for erModuleType complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="erModuleType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="_type" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="mtype" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="erProperties" type="{http://www.xml.util.haflow}erPropertiesType"/>
 *         &lt;element name="position" type="{http://www.xml.util.haflow}positionType"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "erModuleType", propOrder = {
    "id",
    "name",
    "_type",
    "mtype",
    "erProperties",
    "position"
})
public class ErModuleType {

    @XmlElement(required = true)
    protected String id;
    @XmlElement(required = true)
    protected String name;
    @XmlElement(name = "_type", required = true)
    protected String _type;
    @XmlElement(required = true)
    protected String mtype;
    @XmlElement(required = true)
    protected ErPropertiesType erProperties;
    @XmlElement(required = true)
    protected PositionType position;

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the type property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String get_type() {
        return _type;
    }

    /**
     * Sets the value of the type property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void set_type(String value) {
        this._type = value;
    }

    /**
     * Gets the value of the mtype property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMtype() {
        return mtype;
    }

    /**
     * Sets the value of the mtype property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMtype(String value) {
        this.mtype = value;
    }

    /**
     * Gets the value of the erProperties property.
     * 
     * @return
     *     possible object is
     *     {@link ErPropertiesType }
     *     
     */
    public ErPropertiesType getErProperties() {
        return erProperties;
    }

    /**
     * Sets the value of the erProperties property.
     * 
     * @param value
     *     allowed object is
     *     {@link ErPropertiesType }
     *     
     */
    public void setErProperties(ErPropertiesType value) {
        this.erProperties = value;
    }

    /**
     * Gets the value of the position property.
     * 
     * @return
     *     possible object is
     *     {@link PositionType }
     *     
     */
    public PositionType getPosition() {
        return position;
    }

    /**
     * Sets the value of the position property.
     * 
     * @param value
     *     allowed object is
     *     {@link PositionType }
     *     
     */
    public void setPosition(PositionType value) {
        this.position = value;
    }

}