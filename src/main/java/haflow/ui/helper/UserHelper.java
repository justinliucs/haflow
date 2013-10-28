package haflow.ui.helper;



import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import haflow.service.UserService;
import haflow.ui.model.SaveUserResultModel;
import haflow.ui.model.UserListModel;
import haflow.ui.model.UserModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import haflow.dto.entity.MainUser;
@Component
public class UserHelper {
	
	private UserService userService;
	private UserService getUserService() {
		return userService;
	}

	@Autowired
	private void setUserService(UserService userService) {
		this.userService = userService;
	}
	public UserModel getUser(int userid){
		MainUser user=this.getUserService().getUser(userid);
		if(user==null)
			return null;
		UserModel userModel=new UserModel();
		userModel.setId(user.getId());
		userModel.setPassword(user.getPassword());
		userModel.setEmail(user.getEmail());
		userModel.setName(user.getName());
		userModel.setRealname(user.getRealname());
		userModel.setRole(user.getRole());
		userModel.setSpace(user.getSpace());
		userModel.setUsedspace(user.getUsedspace());
		return userModel;
		
	}
	public SaveUserResultModel updateUser(int userid,UserModel user){
		boolean success=true;
		String email=user.getEmail();
		success=this.getUserService().updateUserEmail(userid, email);
		success=success&&this.getUserService().updateUser(userid, user.getPassword(), user.getRole(), user.getSpace(), user.getUsedspace(), user.getRealname());
		SaveUserResultModel result=new SaveUserResultModel();
		result.setSuccess(success);
		result.setUserid(userid);
		if(success){
			result.setMessage("success");
		}
		else
			result.setMessage("failed");
		return result;
			
	}
	public boolean updateUserEmail(int userid,String email){
		return this.getUserService().updateUserEmail(userid, email);
	}
	public SaveUserResultModel deleteUser(int userid){
		boolean success=this.getUserService().deleteUser(userid);
		SaveUserResultModel result=new SaveUserResultModel();
		result.setSuccess(success);
		result.setUserid(userid);
		if(success){
			result.setMessage("success");
		}
		else
			result.setMessage("failed");
		return result;
	}
    public int validate(String username,String password,String mora){
    	return this.getUserService().validate(username,password,mora);
    }
    public boolean saveUser(String username,String password,String email,String mora){
    	return this.getUserService().saveUser(username,password,email,mora);
    }
    public UserListModel getAllUser(){
    	List<MainUser> list= this.getUserService().getAllUser();
    	if(list==null)
    		return null;
    	UserListModel userListModel= new UserListModel();
    	List<UserModel> users=new ArrayList<UserModel>();
    	for(MainUser user:list){
    		UserModel userModel=new UserModel();
    		userModel.setId(user.getId());
    		userModel.setName(user.getName());
    		userModel.setPassword(user.getPassword());
    		userModel.setRealname(user.getRealname());
    		userModel.setRole(user.getRole());
    		userModel.setSpace(user.getSpace());
    		userModel.setUsedspace(user.getUsedspace());
    		userModel.setEmail(user.getEmail());
    		users.add(userModel);
    	}
    	userListModel.setUsers(users);
    	return userListModel;
    }
    public static boolean isUserLogon(HttpServletRequest request,int authscope) {
		String username = (String) request.getSession()
				.getAttribute("username");
		Integer scope = (Integer) request.getSession()
				.getAttribute("scope");
		
		if (username != null&&scope!=null)
			if(scope>=authscope)
				return true;
		return false;
	}
	
}
