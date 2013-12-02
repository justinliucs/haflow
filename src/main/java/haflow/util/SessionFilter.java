package haflow.util;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class SessionFilter extends OncePerRequestFilter{
	private boolean isUserLogon(String uri,String userName,Integer scope,String[] notFilter,String filterKey){
		int authScope=0;
		if(filterKey.equals("admin"))
			authScope=1;
		//admin filter
        if(uri.indexOf(filterKey)!=-1){
        	boolean doFilter=true;
        	for(String s:notFilter){
        		if(uri.indexOf(s)!=-1){
        			doFilter=false;
        			break;
        		}
        		
        	}
        	if(doFilter){
        		if(userName!=null&&userName!=""&&scope!=null)
        			if(scope>=authScope){
        				//filterChain.doFilter(request, response);
        				return true;
        			}
        		//response.sendRedirect("/haflow");
        		return false;
        	}
        	//filterChain.doFilter(request, response);
        	return true;
        	
        }
		return true; 
        
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,  
            HttpServletResponse response, FilterChain filterChain)  
            throws ServletException, IOException {  
  
        // uri which not be filtered 
        String[] notFilter = new String[] {"style","script","images","haflow/logon", "haflow/registration","haflow/regiscommit","adminlogon" };  
  
        //uri which make request
        String uri = request.getRequestURI(); 
        System.out.println(uri);
        
        String userName=(String)request.getSession().getAttribute("username");
		Integer scope=(Integer)request.getSession().getAttribute("scope");
        //index page not filter
        if(uri.equals("/haflow/")||uri.equals("/haflow")){
        	filterChain.doFilter(request, response);
        	return;
        }
        //admin user filter
        System.out.println(isUserLogon(uri,userName,scope,notFilter,"admin"));
        System.out.println(isUserLogon(uri,userName,scope,notFilter,"haflow"));
       boolean isLogon=isUserLogon(uri,userName,scope,notFilter,"admin")&&isUserLogon(uri,userName,scope,notFilter,"haflow");
       if(isLogon){
    	   filterChain.doFilter(request, response);
       }else{
    	   //ajax request
    	   String requestType = request.getHeader("X-Requested-With");  
    	   if(requestType!=null&&!requestType.isEmpty()&&requestType.equalsIgnoreCase("XMLHttpRequest")){
    		   response.setHeader("sessionstatus","timeout" );
    		   response.sendError(302,"session timeout");
    		   return;
    	   }
    	    
    	   
    	   response.sendRedirect("/haflow");
    	   return;
       }
       
	}
}
