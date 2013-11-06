<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

  <title>Start Your Free Trial | Haflow Sign In</title>
  <meta name="description" content="Contact Us - Big Data Analytics - haflow" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <script type="text/javascript" src="<%=basePath%>/script/js/logon.js"></script>
	<link rel="stylesheet" href="<%=basePath%>/style/logon.css">
  <script type="text/javascript" language="javascript" src="<%=basePath%>/script/js/website-min.js"></script>
 
  


  <style type="text/css">

    form { 
    width:500px;
    margin-top: 50px;
     }
    form li label { float:left; }

    input.submit_btn{
      display: block;
      height: 36px;
      width: 322px;
      font-size: 18px;
      color: #fff;
      position: relative;
      font-family: 'OpenSans-Regular',Arial;
      font-weight: normal;
      border: 1px solid #77b800;
      text-decoration: none !important;
      background: url(images/mini-btn-green.png) repeat-x left top #0093d0;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      background-color: #D6D6D6;
      cursor:pointer;
    }
	
	input.facebook{
      display: block;
      height: 36px;
      width: 322px;
      font-size: 18px;
      color: #fff;
      position: relative;
      font-family: 'OpenSans-Regular',Arial;
	    border: none;
      text-decoration: none !important;
      background: url(images/btn-login-with-facebook.png) repeat-x left top #0093d0;
       border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      cursor:pointer;
    }

  input.facebook:hover {
    background-position: 0 36px;
  }

    ul.blocks li ul.table li {
      color:#888;
      width:300px;
      padding:3px 35px !important;
      font-size:16px;
      border-bottom:0px solid #fff;
      background:url(images/tick.png) no-repeat left center transparent
    }
	ul.blocks li p.bannerh1 {
		font-size:30px;
		color: #fff;
		font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif;
		font-weight: 300;
		line-height: -20px;
	}
  </style>
</head>
<body>
<div id="wrapper">
  <div id="header">
    <div id="content_h">
      <div  id="menu">
        <span id="logo_menu" style="display: block; margin-left: 15px;">
          <img width="500" height="70" src="<%=basePath %>/images/logo.png" alt="Haflow Analytics for Hadoop">
        </span>
         
        
        <ul>
          <li>&nbsp;</li>
        </ul>
        
        <div>
		<a class="topbuynow" href="registration" style="color:#fff;">Sign up for Haflow</a>
		</div>
    
        <div class="shadow_header"></div>
      </div>
      <div class="clear"></div>
    </div>
  </div>

  <div id="wrapp-content">




    <div class="clear"></div>

    <div id="content">
      <div class="top_info">
        <h1>Sign in for your secure trial of Haflow</h1>
      	
      </div>
      
		<div class="clear"></div><br />
      <ul class="blocks">
		
        <li class="wid540">
        <form class="lpeRegForm formNotEmpty" method="post" enctype="application/x-www-form-urlencoded" action="" id="form" name="form">
        <ul class='mktLblLeft'>
		<li class='mktField' style="width:500px;">
        <table>
        <tr>
        <td style="width:150px; vertical-align:top;">&nbsp;</td>
        <td>
       <span id="errorSpan" style="color:#F00"><%if(request.getAttribute("message")!=null) out.println("*"+request.getAttribute("message")); %></span>
        </td>
        </tr>
        </li>
        <li class='mktFormReq mktField' style="width:500px;" >
        <table>
        <tr>
        <td style="width:150px;"><label>Name:</label>
        <span style="color:#F00">*</span></td>
        <td><span class='mktInput'><input class='mktFormText mktFormString mktFReq' name="username" id="username" type='text' value=""  maxlength='255' tabIndex='1' />
        <span class='mktFormMsg' id="error_username"></span></span>
        </td>
        </tr>
        </table>
        </li>

      <div class="clear"></div><br />

        <li class='mktFormReq mktField' style="width:500px;" >
        <table>
        <tr>
        <td style="width:150px;"><label>Password:</label><span style="color:#F00">*</span></td>
        <td><span class='mktInput'><input class='mktFormText mktFormString mktFReq' name="password" id="password" type='password' value=""  maxlength='255' tabIndex='2' />
        <span class='mktFormMsg' id="error_password"></span></span>
        </td>
        </tr>
        </table>
        </li>

      <div class="clear"></div><br />
		
        <li class='mktField' style="width:500px;">
        <table>
        <tr>
        <td style="width:150px; vertical-align:top;">&nbsp;</td>
        <td><br />

      <div id='mktFrmButtons'>
      	<input id='mktFrmSubmit' type='button' class="submit_btn" value='Sign In' name='main-log' onclick="fun()"/>
      	<p align="center" style="font-weight:700; padding-bottom:4px;">OR</p>
       
      	<input id='mktFrmSubmit' type='button' class="facebook" value='Administrator Sign In' name='admin-log' onclick="fun1()"/>
	</div>
        </td>
        </tr>
        
        </table>
        </li>

      <li class='mktField' style="display: none;"><label>Lead Source:</label><span class='mktInput'><input class='mktFormHidden' name="LeadSource" id="LeadSource" type='hidden' value="Website" /><span class='mktFormMsg'></span></span></li>

      <div class="clear"></div><br />



        </ul>

        <span style="display:none;"><input type="text" name="_marketo_comments" value="" /></span>
      
        </form>  

        </li>


        <li class="wid340">
        <img src="<%=basePath%>/images/logon.png" alt="Start Your Trial - Haflow" width="460" />
        <ul class="table">
        <li>Instant access to Haflow.</li>
        <li>No download required.</li>
        </ul>
        </li>
        </ul>
   

      <div class="clear"></div>
          
           <div class="clear"></div>
			<div class="line margintop"></div>



      <div id="copyright">&copy; 2013  Technology Center of Software Egnineering,  Institute of Software Chinese Academy of Sciences.  All rights reserved. </div>
    
   
      <div class="clear"></div>
    </div>

    <div class="clear"></div>
  </div>
  <div class="clear"></div>
</div>

<!-- please only change if you know what you do -->
<input name="modules" value="onlineInstance" type="hidden" />
<!--[if IE]>
<input name="modules" value="ieExtention" type="hidden" />
<![endif]-->
<input name="modules" value="menueAllwaysTop" type="hidden" />
<input name="modules" value="marketoTracking" type="hidden" />
<!-- please only change if you know what you do -->
<!-- start leadlander -->
<script type="text/javascript" language="javascript">llactid=17071</script>

<!-- end leadlander -->

</body>
</html>
