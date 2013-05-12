require([
	"require",
	"dojo/_base/array",
	"dojo/_base/config",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/_base/kernel",
	"dojo/query",
	"dojo/ready",
	"dojo/_base/window",
	"dojo/_base/fx",
	"dijit/registry",
	"dijit/MenuItem",
	"dojo/date/locale",
	"dojo/parser",
	"dojo/data/ItemFileReadStore",
	"dojo/data/ItemFileWriteStore",
	"dijit/tree/ForestStoreModel",
	"dojo/number", // dojo.number.format
	"dojo/dnd/Source", // dojo.dnd.Source
	"dojo/_base/json", // dojo.toJson
	"dijit/dijit-all", // dijit.*
	"dojox/layout/ContentPane",
	"dijit/layout/ContentPane", 
	"dijit/layout/TabContainer",
	"haflow/flow"
	    ], function(require, array, config, dom, domClass, domConstruct, kernel, query, ready, win, fx, registry, MenuItem,
			locale, parser, ItemFileReadStore,ItemFileWriteStore, ForestStoreModel, number, source, json, 
		    all, xContentPane, ContentPane, TabContainer, flow){

	 newTab=function(boxId)
	    {
	    	
	    	 
	    	 var ntp = new dijit.layout.ContentPane({
	    		 title:"新建文件", 
	  	         style:"display:none; padding:10px;", 
	             content: "We offer amazing food",
	             closable:true,
	             id:boxId
	        });
	    	
	    	 dijit.byId("topTabs").addChild(ntp); 
	    	  dijit.byId("topTabs").selectChild(boxId.toString());
	    }
	    
	 runFlow=function(){
		 dojo.rawXhrPost({
             url: "/haflow/flow/run.json",
             postData: dojo.toJson({            	 
 	            jarPath: dojo.query(".jarPath")[0].value,
	            inPath: dojo.query(".inPath")[0].value,
	            outPath: dojo.query(".outPath")[0].value,
	            confPath: dojo.query(".confPath")[0].value,
                console: "input"
             }),
            handleAs: "json",
            headers: { "Content-Type": "application/json"},

             error: function(error) {
                 alert(error.message);
             },
             load: function(response) {
                 alert(response.console);
                 domConstruct.place(domConstruct.toDom("<li>" + response.console + "</li>"), 
                		 dom.byId("btab0console"));
                 dijit.byId("bottomTabs").selectChild("btab0");
             }
         });
	 }
	 
	 saveFlow=function(){
		 dojo.rawXhrPost({
			 url: "/haflow/flow/save.json",
             postData: dojo.toJson({            	            	 
            	 identifier: "entryFlow",
            	 label: "Entry Flow",
            	 erModule: [{
            	        id: moduleArray[0].id,
            	        name: moduleArray[0].name,
            	        type: moduleArray[0].type,
            	        properties: [{
            	            jarPath: dojo.query(".jarPath")[0].value,
            	            inputPath: dojo.query(".inPath")[0].value,
            	            outputPath: dojo.query(".outPath")[0].value,
            	            confPath: dojo.query(".confPath")[0].value
            	          }],
            	        position:[{
            	        	x:moduleArray[0].x,//TODO
            	        	y:moduleArray[0].y
            	        }]
             		}]
             }),
            handleAs: "json",
            headers: { "Content-Type": "application/json"},
            error: function(error) {
                 alert(error.message);
            },
            load: function(response) {
                 alert(response.erModule[0].id);
            }
		 });
	 }
	 
	 openFlow=function(){
		 dojo.xhrGet({
			 url: "/haflow/flow/open.json",
            handleAs: "json",
            headers: { "Content-Type": "application/json"},
            error: function(error) {
                 alert(error.message);
            },
            load: function(response) {
                 var ppp = $("#flowContent")[0];
                 flow.createEmModule(ppp, response.erModule[0].position[0].x, 
                		 response.erModule[0].position[0].y, response.erModule[0].id,
                 response.erModule[0].properties[0].jarPath,
                 response.erModule[0].properties[0].inputPath,
                 response.erModule[0].properties[0].outputPath,
                 response.erModule[0].properties[0].confPath);
            }
		 });
	 }
	 
	ready(function(){
		// Delay parsing until the dynamically injected theme <link>'s have had time to finish loading
		setTimeout(function(){
			    parser.parse();
				dom.byId('loaderInner').innerHTML += " done.";
				setTimeout(function hideLoader(){
					fx.fadeOut({ 
						node: 'loader', 
						duration:50,
						onEnd: function(n){
							n.style.display = "none";
						}
					}).play();
				}, 250);
		});
		//alert(flow.name);
	});

});