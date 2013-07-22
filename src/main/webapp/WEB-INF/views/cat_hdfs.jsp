<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet"
	href="http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/../dijit/themes/claro/claro.css">
<style type="text/css">
@import
	"http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/../dojox/grid/resources/claroGrid.css"
	;

/*Grid needs an explicit height by default*/
#gridDiv {
	height: 20em;
}
</style>
<script>
	dojoConfig = {
		async : true,
		parseOnLoad : false
	}
</script>
<script type="text/javascript"
	src='http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/dojo.js' ></script>

<script>
	require([ 'dojo/_base/lang', 'dojox/grid/DataGrid',
			'dojo/data/ItemFileWriteStore', 'dojox/grid/cells/dijit',
			'dojo/dom', 'dojo/domReady!' ],
			function(lang, DataGrid,
			ItemFileWriteStore, cells, dom) {
		
		/*set up data store*/
		var data = {
			identifier : "id",
			items : []
		};
		
// 		var data_list=JSON.parse('[{"col2":"aa"},{"col2":"bb"}]');
		var data_list=JSON.parse('${content}');


        for(var i = 0 ; i < data_list.length; i++){
          data.items.push(lang.mixin({ id: i+1 }, data_list[i]));
        
        }

		
		var store = new ItemFileWriteStore({
			data : data	
		});

		/*set up layout*/
		var layout = [ [ {
			'name' : 'id',
			'field' : 'id',
			'width' : '100px'
		}, {
			'name' : 'sepallength',
			'field' : 'sepallength',
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		} ,{
			'name' : 'sepalwidth',
			'field' : 'sepalwidth',
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		} ,{
			'name' : 'petallength',
			'field' : 'petallength',
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		},
		{
			'name' : 'petalwidth',
			'field' : 'petalwidth',
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		}, {
			'name' : 'class',
			'field' : 'class',
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		}] ];

		/*create a new grid*/
		var grid = new DataGrid({
			id : 'grid',
			store : store,
			structure : layout,
			rowSelector : '20px'
		});

		/*append the new grid to the div*/
		grid.placeAt("gridDiv");

		/*Call startup() to render the grid*/
		grid.startup();
	});
</script>
</head>
<body class="claro">
	<p class="info">iris</p>
	<div id="gridDiv"></div>
</body>
</html>