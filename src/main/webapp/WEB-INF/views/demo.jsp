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
		data-dojo-config="parseOnLoad: false, async:true"></script> 
				
<script type="text/javascript" src="static/js/src.js"></script>
<link rel="stylesheet" href="static/css/demo.css"/>

<!-- added by zhaowei -->
	<script type="text/javascript" src="static/zjs/jquery-1.9.0.js"></script>
	<script type="text/javascript" src="static/zjs/jquery-ui-1.10.0.custom.js"></script>
	<script type="text/javascript" src="static/zjs/jquery.jsPlumb-1.3.16-all.js"></script>
	<script type="text/javascript" src="static/zjs/jsPlumb_example.js"></script>
	<script type="text/javascript" src="static/zjs/demo-helper-jquery.js"></script>
	
	<link href="static/zcss/flowchartDemo.css" rel="stylesheet" type="text/css" />
	<link href="static/zcss/perimeterAnchorsDemo.css" rel="stylesheet" type="text/css" />
	
	<link rel="stylesheet" href="static/zcss/form.css"/>	
<!-- end added by zhaowei -->
</head>
<body class="claro">
	<!-- basic preloader: -->
	<div id="loader"><div id="loaderInner" style="direction:ltr;white-space:nowrap;overflow:visible;">Loading ... </div></div>

	<div id="main" data-dojo-type="dijit.layout.BorderContainer" data-dojo-props="liveSplitters:false, design:'sidebar'">
	<div data-dojo-type="dijit.layout.AccordionContainer" data-dojo-props="region:'leading', splitter:true, minSize:20"
			style="width: 300px;" id="leftAccordion">


			<div data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Tree"'>
				<!-- tree widget -->
		      <div dojoType="dojo.data.ItemFileWriteStore" url="/haflow/helloworld.json"  jsId="continentStore">
				  <script type="dojo/connect" event="onNew" args="newItem">
                 
                      dojo.rawXhrPost({
                        url: "/haflow/helloworld/newItem.json",
                        postData: dojo.toJson({
                            id: this.getValue(newItem,"id"),
                            name: this.getValue(newItem,"name"),
                            type: this.getValue(newItem,"type"),  
                        }),
                       handleAs: "json",
                       headers: { "Content-Type": "application/json"},

                        error: function(error) {
                            alert(error.message);
                        },
                        load: function(response) {
                            alert("新建成功");
                        }
                    });
              
                </script>
                </div>
                 <div dojoType="dijit.tree.ForestStoreModel" store="continentStore"
                jsId="continentModel" rootLabel="我的工程"></div> 
				
				<div data-dojo-type="dijit.Tree"  id="menuTree"
					data-dojo-props="model: continentModel, query:{ type:'process'}, label:'我的工程', openOnClick:false">
					<script type="dojo/method" data-dojo-event="onClick" data-dojo-args="item">
                      
                     
                      var tabid=dijit.byId(continentStore.getValue(item,"id"));
                       
       	             if(tabid)
                      {
                      
                       dijit.byId('topTabs').selectChild(continentStore.getValue(item,"id"));
                      }
                     else{
                      
   	                     var tb = new dijit.layout.ContentPane({
   		                  title:continentStore.getValue(item,"name"), 
 	                      style:"display:none; padding:10px;", 
                          content: "We offer amazing food",
                          closable:true,
                          id:continentStore.getValue(item,"id")
                         });
   	  	                 if(tb)
                           {
                         
                           dijit.byId("topTabs").addChild(tb);  
                           }
                       dijit.byId('topTabs').selectChild(continentStore.getValue(item,"id").toString());
   	                  
                     }
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


			<!-- added by zhaowei -->
			<div id="flowTab" data-dojo-type="dijit.layout.ContentPane" data-dojo-props='title:"Flow Widgets", style:"padding:10px;display:none;"'>			
				<div id="flowContent" >
					<p></p>
				</div>			
			</div>
			<!-- end added by zhaowei -->
			
			</div>

	 <!-- end of region="center" TabContainer -->

		<!-- bottom right tabs -->
		<div data-dojo-type="dijit.layout.TabContainer" id="bottomTabs"
			data-dojo-props="
				tabPosition:'bottom', selectedchild:'btab1', region:'bottom',
				splitter:true, tabStrip:true
			">
			<!-- btab 1 -->
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
			</div><!-- end:info btab1 -->
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
			</div>

		</div><!-- end Bottom TabContainer -->

	</div><!-- end of BorderContainer -->
</div>
	<!-- context menu in tree item -->
	<ul id="menuTree_menu" data-dojo-type="dijit/Menu"
                    data-dojo-props='style:"display: none;", targetNodeIds: ["menuTree"], selector: ".dijitTreeNode"'>
            <li data-dojo-type="dijit/MenuItem" >
                    <script type="dojo/connect" data-dojo-event="onClick">
                          var boxId=(new Date()).getTime();
    
                            var tn = dijit.byNode(this.getParent().currentTarget);
                      continentStore.newItem({
                       id: boxId.toString(),
                       name: "新建文件",
                       type: "process", 
                   });
                   newTab(boxId);
                    </script>
                                                     新建
            </li>
             <li data-dojo-type="dijit/MenuItem">
                    <script type="dojo/connect" data-dojo-event="onClick">
                            // get a hold of the dijit.TreeNode that was the source of this open event
                            var tn = dijit.byNode(this.getParent().currentTarget);
                           
                        
                        dojo.rawXhrPost({
                        url: "/haflow/helloworld/deleteItem.json",
                        postData: dojo.toJson({
                            id: continentStore.getValue(tn.item,"id"),
                            name: continentStore.getValue(tn.item,"name"),
                            type: continentStore.getValue(tn.item,"type"), 
                        }),
                       handleAs: "json",
                       headers: { "Content-Type": "application/json"},

                        error: function(error) {
                            alert(error.message);
                        },
                        load: function(response) {
                            alert("删除成功");
                        }
                    });
                        var tabid=dijit.byId(continentStore.getValue(tn.item,"id"));
                        if(tabid){
                             
                             dijit.byId("topTabs").removeChild(tabid);
                           
                            }
                             continentStore.deleteItem(tn.item);
                     
                    </script>
                                                                  删除
            </li>
            
     </ul>
	<!-- End--context menu in tree item -->
</body>
</html>