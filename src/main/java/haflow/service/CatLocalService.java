package haflow.service;
import java.io.BufferedReader;
import java.io.FileReader;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class CatLocalService {
	public String readFile(String file) {
		try {
			BufferedReader d=new BufferedReader(new FileReader(file));
			String s;
			String[] col=new String[10];
			String[] value=new String[10];
			JSONArray arr=new JSONArray();
			int i=0;
			while ((s=d.readLine())!=null) {
				if(s.startsWith("@ATTRIBUTE"))
				{
					col[i]=(s.split("\\s+"))[1];
					i++;
							}
				if(s.startsWith("@DATA"))
					break;
			}		
			while ((s=d.readLine())!=null&&!(s.startsWith("%"))){
				value=s.split(",");
				JSONObject jobj=new JSONObject();
				for(int j=0;j<value.length;j++){
					jobj.put(col[j], value[j]);
				}
				arr.put(jobj);			    	
			}
			d.close();
			System.out.println(arr.toString());
			return arr.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}

