function fun3(){
	if(checkAll()&&RePass()){
		

		document.getElementById("mora").value = "main";

		document.getElementById("form2").submit();
	}
	
	
} 
function fun4(){
if(checkAll()&&RePass()){
		
		document.getElementById("mora").value= "admin";
		
		document.getElementById("form2").submit();
	}
	
}
function checkAll(){
	if(checkPass()){
		if(form_validation('username')&form_validation('email')&form_validation('password'))
			return true;
		else
			return false;
	}
	else
		return false;
}
function RePass(){
	var retype_pwd = document.getElementsByName('password1')[0].value;
	   var input_pwd = document.getElementsByName('password')[0].value;
	if(retype_pwd==input_pwd){
		return true;
	}
	else{
		document.getElementById("password1_err").innerHTML="Password doesn't match the confirmation";
		return false;
	}
		
}
//check null
function checkPass() {
	 
		       var null_flag=0;
		       var user_name = document.getElementsByName('username')[0].value;
		       var eml_msg=document.getElementsByName("email")[0].value;
			   var retype_pwd = document.getElementsByName('password1')[0].value;
			   var input_pwd = document.getElementsByName('password')[0].value;

			   
			   if(user_name==""){
		       document.getElementById("username_err").innerHTML="username can not be blank";     
		       document.getElementsByName('username')[0].value="";		     
		       document.getElementsByName('username')[0].style.border="1px solid red";
		       null_flag=1;}
			   
			   if(eml_msg==""){
				   document.getElementById("email_err").innerHTML="email can not be blank";     
			       document.getElementsByName('email')[0].value="";		     
			       document.getElementsByName('email')[0].style.border="1px solid red";
			       null_flag=1;}		   
			   if(input_pwd==""){
				   
				   document.getElementById("password_err").innerHTML="password can not be blank";       
		       document.getElementsByName('password')[0].value="";		     
		       document.getElementsByName('password')[0].style.border="1px solid red";
		       null_flag=1;}			   
			   
			   if(retype_pwd==""){
				   document.getElementById("password1_err").innerHTML="password can not be blank";       
			     document.getElementsByName('password1')[0].value="";		     
			     document.getElementsByName('password1')[0].style.border="1px solid red";
			     null_flag=1;
			   }
			   if((null_flag==0)) return true;
			   else return false;
 } 

function clean() {
	   document.getElementsByName('username')[0].value="";		     
	   document.getElementsByName('password')[0].value="";
	   document.getElementsByName('email')[0].value="";
	   document.getElementsByName('password1')[0].value="";
}		 
//check form		   
function form_validation(name) {
	   var input_value = document.getElementsByName(name)[0].value;
	   var regx=null;
	   var err=null;
	   if(name=="username"){
		   regx=/^[a-z0-9_-]{3,8}$/;
		   err="please write 3 to 8 letters or numbers";
	   }
	   if(name=="password"){
		   regx=/^[a-z0-9_-]{4,18}$/;
		   err="please write 4 to 18 letters or numbers";
	   }
	   if (name == "email") {
		regx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		err = "please write valid email address";
	   }
	   if(!regx.test(input_value)){
	       
		   var errmsg=name+"_err";
		   
		   document.getElementById(errmsg).innerHTML = err;
		   
	       document.getElementsByName(name)[0].value="";		     
	       document.getElementsByName(name)[0].style.border="1px solid red";
	      
	       return false;

	   }
	   else 
	   {
		   return true;

	   }
}	   		   
		   
		   
		     
		   
