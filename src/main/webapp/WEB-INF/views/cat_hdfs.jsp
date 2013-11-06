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
		
		var data_list=JSON.parse('${content}');
        for(var i = 2 ; i < data_list.length; i++){
          data.items.push(lang.mixin({ id: i+1 }, data_list[i]));
        
        }

		
		var store = new ItemFileWriteStore({
			data : data	
		});
    var length=eval(data_list)[0]["length"];
	var layout=[];
	for(i=0;i<length;i++)
		{
		layout.push({
			'name' :eval(data_list)[1][i],
			'field' : eval(data_list)[1][i],
			'width' : '80px',
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		});
		}

		/*set up layout*/
/* 		var layout = [ [ {
			'name' :eval(data_list)[0]["0"],
			'field' : eval(data_list)[0]["0"],
			'width' : '100px'
		}, {
			'name' : eval(data_list)[0]["1"],
			'field' : eval(data_list)[0]["1"],
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		} ,{
			'name' : eval(data_list)[0]["3"],
			'field' : eval(data_list)[0]["3"],
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		} ,{
			'name' : eval(data_list)[0]["4"],
			'field' : eval(data_list)[0]["4"],
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		},
		{
			'name' : eval(data_list)[0]["5"],
			'field' : eval(data_list)[0]["5"],
			
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		}, {
			'name' : eval(data_list)[0]["6"],
			'field' : eval(data_list)[0]["6"],
			'width' : '100px',
			editable : true,
			type : dojox.grid.cells.CheckBox,
			styles : 'text-align: center;'
		}] ]; */

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