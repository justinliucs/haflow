<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>demo preview</title>

<link rel="stylesheet" href="static/dojolib/dijit/themes/claro/document.css"/>
<link rel="stylesheet" href="static/dojolib/dijit/themes/claro/claro.css"/>
<script type="text/javascript" src="static/dojolib/dojo/dojo.js"
		data-dojo-config="parseOnLoad: false, async:false"></script> 
				
<script type="text/javascript" src="static/js/src.js"></script>
<link rel="stylesheet" href="static/css/demo.css"/>

<!-- added by zhaowei -->
	<script type="text/javascript" src="static/zjs/jquery-1.9.0.js"></script>
	<script type="text/javascript" src="static/zjs/jquery-ui-1.10.0.custom.js"></script>
	<script type="text/javascript" src="static/zjs/jquery.jsPlumb-1.3.16-all.js"></script>
	<script type="text/javascript" src="static/zjs/jsPlumbFlow.js"></script>
	<script type="text/javascript" src="static/zjs/demo-helper-jquery.js"></script>
	<script>
		 var moduleArray = [];
		 var fullJsona = { identifier: 'abbr',
		  label: 'name',
		  items: [
		    { abbr:'ec', name:'Ecuador', capital:'Quito', type:"FLOW"},
		    { abbr:'eg', name:'Egypt', capital:'Cairo', type:"FLOW" },
		    { abbr:'sv', name:'El Salvador', capital:'San Salvador', type:"FLOW"}
		]};
		 var fullJson;
		 loadJson();	
	</script>
	
	<link href="static/zcss/flowchartDemo.css" rel="stylesheet" type="text/css" />
	<link href="static/zcss/perimeterAnchorsDemo.css" rel="stylesheet" type="text/css" />
	
	<link rel="stylesheet" href="static/zcss/form.css"/>	
<!-- end added by zhaowei -->
</head>
<body class="claro">
	<!-- basic preloader: -->
	<div id="loader"><div id="loaderInner" style="direction:ltr;white-space:nowrap;overflow:visible;">Loading ... </div></div>

	<div id="main" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="liveSplitters:false, design:'sidebar'">
	
	<!--  added by zhaowei -->
		<div id="header" data-dojo-type="dijit.MenuBar" data-dojo-props="region:'top'">
			<div data-dojo-type="dijit.PopupMenuBarItem" id="flow">
				<span>Flow</span>
				<div data-dojo-type="dijit.Menu" id="editMenu">
<!--				<div data-dojo-type="dijit.MenuItem" id="openFlow" 
						data-dojo-props="iconClass:'dijitIconOpen', onClick:openFlow">Open</div>
 					<div data-dojo-type="dijit.MenuItem" id="openFlow2" 
						data-dojo-props="iconClass:'dijitIconOpen', onClick:openFlow2">Open2</div> -->
<!-- 				<div data-dojo-type="dijit.MenuItem" id="save" 
						data-dojo-props="iconClass:'dijitIconSave', onClick:saveFlow" >Save</div>  -->
					<div data-dojo-type="dijit.MenuItem" id="save2" 
						data-dojo-props="iconClass:'dijitIconSave', onClick:saveFlow2" >Save Project</div>
					<div data-dojo-type="dijit.MenuItem" id="newFlow" 
						data-dojo-props="iconClass:'dijitIconUndo', onClick:rNewFlow" >New Flow</div>
					<div data-dojo-type="dijit.MenuItem" id="newErModule" 
						data-dojo-props="iconClass:'dijitIconUndo', onClick:rNewErModule" >New ER Module</div>
				</div>
			</div>					
		
			<div data-dojo-type="dijit.PopupMenuBarItem" id="fun">
				<span>Run</span>
				<div data-dojo-type="dijit.Menu" id="helpMenu">
			<!-- 	<div data-dojo-type="dijit.MenuItem" id="run" 
						data-dojo-props="iconClass:'dijitIconUndo', onClick:runFlow" >Run</div>	 -->
					<div data-dojo-type="dijit.MenuItem" id="runCurrent" 
						data-dojo-props="iconClass:'dijitIconUndo', onClick:runCurrentFlow" >Run Current</div>					
				</div>
			</div>
		
		</div><!-- end added by zhaowei -->
		
	<div data-dojo-type="dijit.layout.AccordionContainer" data-dojo-props="region:'leading', splitter:true, minSize:20"
			style="width: 300px;" id="leftAccordion">


			<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Tree"'>
				<!-- tree widget -->
		       
		       <script>
		       
		       </script>
		      <!--  <div dojoType="dojo.data.ItemFileReadStore" url="/haflow/full/get.json"  jsId="continentStore"> --> 
		      <div dojoType="dojo.data.ItemFileWriteStore" data-dojo-props="data:fullJson"  jsId="continentStore"> 		      		     
				<script type="dojo/connect" event="onNew" args="newItem">                 
                      newStoreItemCallback(newItem);              
                </script>             
              </div>
              
             <!--  <div dojoType="dijit.tree.ForestStoreModel" store="continentStore" jsId="continentModel" rootLabel="我的工程"></div> --> 
              
              <div data-dojo-type="dijit/tree/ForestStoreModel" data-dojo-id="continentModel"
    			data-dojo-props="store:continentStore, query:{type:'FLOW'},
    				rootId:'continentModel', rootLabel:'Entry Flows'"></div>                         
				
			  <div data-dojo-type="dijit.Tree"  id="menuTree"
					data-dojo-props="model: continentModel, label:'工程', openOnClick:false">
				<script type="dojo/method" data-dojo-event="onClick" data-dojo-args="item">                                           
                      menuClicked(item);
               	</script>
			  </div>
			</div>
		</div>

		<!-- end left AccordionContainer -->
		
		<div data-dojo-type="dijit.layout.AccordionContainer" data-dojo-props="region:'trailing', splitter:true, minSize:20"
			style="width: 300px;" id="rightAccordion">
			<!-- added by zhaowei -->
			<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='selected:true, title:"Modules List"'>
				<div class="window boxstyle" id="1"> <strong>ER</strong></div>
		      	<div class="window boxstyle" id="2"> <strong>TEST</strong></div>
      			<div class="window boxstyle" id="3"> <strong>HQ</strong></div>			
			</div>
			
			<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='selected:true, title:"Modules List 2"'>
				<div class="shape" data-shape="rectangle">rectangle</div>
				<div class="shape" data-shape="ellipse" >ellipse</div>
				<div class="shape" data-shape="circle" >circle</div>
				<div class="shape" data-shape="diamond">diamond</div>
				<div class="shape" data-shape="triangle" >triangle</div>
			</div>
			<!-- end added by zhaowei -->

		</div>
		<!-- end right AccordionContainer -->

		<!-- top tabs (marked as "center" to take up the main part of the BorderContainer) -->
		<div data-dojo-type="dijit.layout.TabContainer" data-dojo-props="region:'center', tabStrip:true" id="topTabs">


			<!-- 
			<div id="flowTab" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Flow Widgets", style:"padding:10px;display:none;"'>			
				<div id="flowContentr" class="flowContent" >
					<p></p>
				</div>			
			</div>
			-->
			
		</div>

	 <!-- end of region="center" TabContainer -->

		<!-- bottom right tabs -->
		<div data-dojo-type="dijit.layout.TabContainer" id="bottomTabs"
			data-dojo-props="
				tabPosition:'top', selectedchild:'btab1', region:'bottom',
				splitter:true, tabStrip:true">
			
			<div id="btab0" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Console", style:" padding:10px; "'>
				Log Console : 
				</br>
				<ul id="btab0console">
				</ul>				
			</div>
			
			<!-- 
			<div id="btab1" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Info", style:" padding:10px; "'>
				<p>You can explore this single page after applying a Theme
				for use in creation of your own theme.</p>

				<p>There is a right-click [context] pop-up menu here, as well.</p>
				<form dojoType="dijit.form.Form" id="myForm"
			onsubmit="alert('Execute form w/values:\n'+dojo.toJson(this.getValues(),true));return confirm('Show form values in the URL?')">
					<div class="formAnswer">
						<label class="firstLabel" for="name">Name *</label>
						<input type="text" id="name" name="name" class="medium"
							dojoType="dijit.form.ValidationTextBox"
							required="true" 
							ucfirst="true" invalidMessage=""/>
						<br>
						<input type="submit"/>
					</div>
					
				
				</form>
			</div>
			<div id="btab2" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Info2", style:" padding:10px; "'>
					<div>					
						<form id="form11" method="GET" action="<c:url value="/run1" />">
							<c:if test="${not empty message}">
								<div id="message" class="success">${message}</div>	
					  		</c:if>
					  		<c:if test="${not empty message1}">
								<div id="message1" class="success">${message1}</div>	
					  		</c:if>
					  		<br/>

							<label for="name">Username:</label>
							<input type="text" name="username" value="j2ee" />

							<label for="password">Password:</label>
							<input type="password" name="password" value="j2ee" />

							
							<p><button type="submit">Submit</button></p>
							<a href="<c:url value="/run" />" title="forms">Forms</a>
						
						</form>
					</div>
			</div>
			
			<div id="btab3" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Info3", style:" padding:10px; "'>								
				<div id="contentPane" dojoType="dojox.layout.ContentPane" href="<c:url value="/form" />"> 
			   		Loading contents.html. 
				</div> 
			</div>
			
			<div id="btab4" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"ER Conf", style:" padding:10px; "'>								
				<div id="entryContentPane" dojoType="dojox.layout.ContentPane" href="<c:url value="/entry" />"> 
			   		Loading contents.html. 
				</div> 
			</div>
			
			<div id="btab5" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"HQ Conf", style:" padding:10px; "'>								
				<div id="hiveContentPane" dojoType="dojox.layout.ContentPane" href="<c:url value="/hive" />"> 
			   		Loading contents.html. 
				</div> 
			</div> -->

		</div><!-- end Bottom TabContainer -->

	</div><!-- end of BorderContainer -->
</div>

			<div class="dijitDialogPaneContentArea">
	            <div data-dojo-type="dijit/Dialog" data-dojo-id="rNewFlowDialog" title="Name the Flow">
				    <table class="dijitDialogPaneContentArea">
				        <tr>
				            <td><label for="rNewFlowName">Name:</label></td>
				            <td><input data-dojo-type="dijit/form/TextBox" name="name" id="rNewFlowName"></td>
				        </tr>
				    </table>
				
				    <div class="dijitDialogPaneActionBar">
				        <button data-dojo-type="dijit/form/Button" type="submit" id="ok" data-dojo-props="onClick:fNewFlowNameCallBack">OK</button>
				        <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){rNewFlowDialog.hide();}"
				                id="cancel">Cancel</button>
				    </div>
				</div>
				
				<div data-dojo-type="dijit/Dialog" data-dojo-id="flowDeleteConfirmDialog" title="Delete Confirm">
				    <div id="flowDeleteConfirmContent">Delete Flow?</div>
				    <div class="dijitDialogPaneActionBar">
				        <button data-dojo-type="dijit/form/Button" type="submit" onClick="flowDeleteConfirmCallback">Delete</button>
				        <button data-dojo-type="dijit/form/Button" type="button" onClick="flowDeleteConfirmDialog.hide();">Cancel</button>
				    </div>
				</div>
			</div>
	<!-- context menu in tree item -->
	
	<ul id="menuTree_menu" data-dojo-type="dijit/Menu"
                    data-dojo-props='style:"display: none;", targetNodeIds: ["menuTree"], selector: ".dijitTreeNode"'>
			<li data-dojo-type="dijit/MenuItem" >            
                <script type="dojo/connect" data-dojo-event="onClick">rOpenFlow(this)</script>
				打开
            </li>
            <li data-dojo-type="dijit/MenuItem" >            
                <script type="dojo/connect" data-dojo-event="onClick">rNewFlow()</script>
                                            新建
            </li>
            <li data-dojo-type="dijit/MenuItem">
				<script type="dojo/connect" data-dojo-event="onClick">rDeleteFlow(this);</script>
                                          删除
            </li>
            <li data-dojo-type="dijit/MenuItem">
				<script type="dojo/connect" data-dojo-event="onClick">rClearFlow(this);</script>
                                          清空
            </li>
            <li data-dojo-type="dijit/MenuItem">
				<script type="dojo/connect" data-dojo-event="onClick">rRunFlow(this);</script>
                                          运行
            </li>
            
     </ul>
	<!-- End--context menu in tree item -->
</body>
</html>