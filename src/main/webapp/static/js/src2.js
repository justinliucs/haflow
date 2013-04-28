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
	"dijit/tree/ForestStoreModel",
	"dojo/number", // dojo.number.format
	"dojo/dnd/Source", // dojo.dnd.Source
	"dojo/_base/json", // dojo.toJson
	"dijit/dijit-all" // dijit.*
], function(require, array, config, dom, domClass, domConstruct, kernel, query, ready, win, fx, registry, MenuItem, locale, parser, ItemFileReadStore, ForestStoreModel){

	continentStore = new ItemFileReadStore({ data: {
		identifier: 'id',
		label: 'name',
		items: [
		        { id: 'AF', name:'Africa', type:'continent', population:'900 million', area: '30,221,532 sq km',
		        		timezone: '-1 UTC to +4 UTC',
		        		children:[{_reference:'EG'}, {_reference:'KE'}, {_reference:'SD'}] },
		        	{ id: 'EG', name:'Egypt', type:'country' },
		        	{ id: 'KE', name:'Kenya', type:'country',
		        			children:[{_reference:'Nairobi'}, {_reference:'Mombasa'}] },
		        		{ id: 'Nairobi', name:'Nairobi', type:'city' },
		        		{ id: 'Mombasa', name:'Mombasa', type:'city' },
		        	{ id: 'SD', name:'Sudan', type:'country',
		        			children:{_reference:'Khartoum'} },
		        		{ id: 'Khartoum', name:'Khartoum', type:'city' },
		        	{ id: 'AS', name:'Asia', type:'continent',
		        			children:[{_reference:'CN'}, {_reference:'IN'}, {_reference:'RU'}, {_reference:'MN'}] },
		        		{ id: 'CN', name:'China', type:'country' },
		        		{ id: 'IN', name:'India', type:'country' },
		        		{ id: 'RU', name:'Russia', type:'country' },
		        		{ id: 'MN', name:'Mongolia', type:'country' },
		        	{ id: 'OC', name:'Oceania', type:'continent', population:'21 million',
		        			children:{_reference:'AU'}},
		        	{ id: 'AU', name:'Australia', type:'country', population:'21 million'},
		        	{ id: 'EU', name:'Europe', type:'continent',
		        			children:[{_reference:'DE'}, {_reference:'FR'}, {_reference:'ES'}, {_reference:'IT'}] },
		        	{ id: 'DE', name:'Germany', type:'country' },
		        	{ id: 'FR', name:'France', type:'country' },
		        	{ id: 'ES', name:'Spain', type:'country' },
		        	{ id: 'IT', name:'Italy', type:'country' },
		        { id: 'NA', name:'North America', type:'continent',
		        		children:[{_reference:'MX'}, {_reference:'CA'}, {_reference:'US'}] },
		        	{ id: 'MX', name:'Mexico', type:'country',  population:'108 million', area:'1,972,550 sq km',
		        			children:[{_reference:'Mexico City'}, {_reference:'Guadalajara'}] },
		        		{ id: 'Mexico City', name:'Mexico City', type:'city', population:'19 million', timezone:'-6 UTC'},
		        		{ id: 'Guadalajara', name:'Guadalajara', type:'city', population:'4 million', timezone:'-6 UTC' },
		        	{ id: 'CA', name:'Canada', type:'country',  population:'33 million', area:'9,984,670 sq km',
		        			children:[{_reference:'Ottawa'}, {_reference:'Toronto'}] },
		        		{ id: 'Ottawa', name:'Ottawa', type:'city', population:'0.9 million', timezone:'-5 UTC'},
		        		{ id: 'Toronto', name:'Toronto', type:'city', population:'2.5 million', timezone:'-5 UTC' },
		        	{ id: 'US', name:'United States of America', type:'country' },
		        { id: 'SA', name:'South America', type:'continent',
		        		children:[{_reference:'BR'}, {_reference:'AR'}] },
		        	{ id: 'BR', name:'Brazil', type:'country', population:'186 million' },
		        	{ id: 'AR', name:'Argentina', type:'country', population:'40 million' }
		]
	}});

	continentModel = new ForestStoreModel({store:continentStore, query:{type:"continent"},rootId:"continentRoot", rootLabel:"Continents", childrenAttrs:["children"]});

	
	


	ready(function(){
		// Delay parsing until the dynamically injected theme <link>'s have had time to finish loading
		setTimeout(function(){
			parser.parse(dom.byId('container'));

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