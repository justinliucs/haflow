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
	"dijit/layout/ContentPane"
], function(require, array, config, dom, domClass, domConstruct, kernel, query, ready, win, fx, registry, MenuItem,
		    locale, parser, ItemFileReadStore,ItemFileWriteStore, ForestStoreModel, xContentPane,ContentPane){

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

	
});

});