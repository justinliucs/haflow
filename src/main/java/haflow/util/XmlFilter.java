package haflow.util;

public class XmlFilter {
	public static String encodeXml(String souceStr){
		if(souceStr==null)
			return "";
		String desStr=replaceString(souceStr,"<","&lt;");
		
		desStr=replaceString(desStr,">","&gt;");
		desStr=replaceString(desStr,"&","&amp;");
		return desStr;
	}
	private static String replaceString(String souceStr,String regex,String replacement){
		int index=souceStr.indexOf(regex);
		String desStr="";
		while(index>=0){
			desStr+=souceStr.substring(0,index)+replacement;
			souceStr=souceStr.substring(index+regex.length());
			index=souceStr.indexOf(regex);
		}
		desStr+=souceStr;
		return desStr;
	}
	public static String decodeXml(String souceStr){
		if(souceStr==null){
			return "";
		}
		String desStr=replaceString(souceStr,"&lt;","<");
		desStr=replaceString(desStr,"&gt;",">");
		desStr=replaceString(desStr,"&amp;","&");
		return desStr;
		
	}
}
