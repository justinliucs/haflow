package haflow.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Util {
	
	public static String getMd5Hex(String password){
		MessageDigest md=null;
		try {
			md = MessageDigest.getInstance("MD5");
			md.reset();  
			md.update(password.getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			System.out.println("NoSuchAlgorithmException caught!");
			System.exit(-1);
			
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		byte[] rs=md.digest();
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<rs.length;i++){
			String tmp=Integer.toHexString(rs[i]&0xff);
			if(tmp.length()==1)
				sb.append("0");
			sb.append(tmp);
		}
		return sb.toString();
		
	}
	

}
