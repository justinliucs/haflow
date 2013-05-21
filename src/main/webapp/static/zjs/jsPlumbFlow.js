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
	//Page load events
	ready(function(){
			//all JavaScript that needs to be call onPageLoad can be put here.
			//SBS.UI.Views.Plumb.init();
			haflow.flow.pane.init("flowContentr");
			haflow.flow.view.init();
		}
	);
});		
