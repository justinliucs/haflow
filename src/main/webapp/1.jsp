<!DOCTYPE html>
<html >
<head>

	<link rel="stylesheet" href="http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/../dijit/themes/claro/claro.css">
	
	<script>dojoConfig = {parseOnLoad: true}</script>
	<script src='http://dojotoolkit.org/reference-guide/1.9/_static/js/dojo/dojo.js'></script>
	
	<script>
require(["dojo/parser", "dijit/layout/TabContainer", "dijit/layout/ContentPane"]);
	</script>
</head>
<body class="claro">
    <div style="width: 350px; height: 300px">
    <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 100%;">
        <div data-dojo-type="dijit/layout/ContentPane" title="My first tab" data-dojo-props="selected:true">
            Lorem ipsum and all around...
        </div>
        <div data-dojo-type="dijit/layout/ContentPane" title="My second tab">
            Lorem ipsum and all around - second...
        </div>
        <div data-dojo-type="dijit/layout/ContentPane" title="My last tab" data-dojo-props="closable:true">
            Lorem ipsum and all around - last...
        </div>
    </div>
</div>
</body>
</html>