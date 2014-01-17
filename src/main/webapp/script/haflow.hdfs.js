dojo.require("dojo.dom");
dojo.require("dojo.aspect");
dojo.require("dojo.on");
dojo.require("dojo.json");
dojo.require("dojo.parser");
dojo.require("dojo.mouse");
dojo.require("dojo.store.Memory");
dojo.require("dojo.store.Observable");
dojo.require("dojo.io.iframe");
dojo.require("dijit.form.Button");
dojo.require("dijit.form.CheckBox");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.tree.ObjectStoreModel");
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");
dojo.require("dijit.TitlePane");
dojo.require("dijit.Toolbar");
dojo.require("dijit.Tree");
dojo.require("dijit.tree.dndSource");
dojo.require("dijit.registry");
dojo.require("dijit.form.Form");
dojo.require("dojo._base.lang");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojox.grid.cells.dijit");
dojo.require("dojox.layout.ContentPane");

// public
HAFlow.Main.prototype.initHdfsFileList = function() {
    var dataContentPane = new dijit.layout.AccordionContainer({
        id: "dataContentPaneId",
        title: myfile.data,
        splitter : "true",
    });
    
    var hdfsFileListContentPane = new dijit.layout.ContentPane({
		id : this.hdfsFileListContainerId,
		title : "HDFS",
	});
    dataContentPane.addChild(hdfsFileListContentPane);    
    var hiveTableListPane = new dijit.layout.ContentPane({
		id : this.hiveTableListContainer,
		title : "HIVE",
	});
    dataContentPane.addChild(hiveTableListPane);  
    this.ui.leadingContainer.addChild(dataContentPane);
    
    this.initHdfsFileListStore();
    this.getHdfsFileList(this.rootPath);
    this.initHdfsFileListTree();
};

HAFlow.Main.prototype.initHdfsFileListStore = function() {
    this.hdfsFileListStore = new dojo.store.Observable(new dojo.store.Memory({
        data: [{
            id: "root",
            name: "Root",
            isDirectory: true,
            path: this.rootPath,
            parentPath: null,
            type: null,
            time: null,
            size: null
        }],
        getChildren: function(object) {
            return this.query({
                parentPath: object.path
            });
        }
    }));
};

HAFlow.Main.prototype.getHdfsFileList = function(path) {
    var _currentInstance = this;
    $.ajax({
        url: this.basePath + "hdfs/list",
        type: "GET",
        dataType: "json",
        data: {
            path: path
        },
        success: function(data, status) {
            _currentInstance.refreshHdfsFileList(_currentInstance, path, data);

        },
        error: function(request, status, error) {
            _currentInstance.addToConsole("An error occurred while loading flow list: " + error, true);
        }
    });
};

HAFlow.Main.prototype.initHdfsFileListTree = function() {
    var treeModel = new dijit.tree.ObjectStoreModel({
        store: this.hdfsFileListStore,
        query: {
            id: "root"
        },
        mayHaveChildren: function(item) {
            return item.isDirectory;
        }
    });

    var tree = new dijit.Tree({
        model: treeModel,
        dndController: dijit.tree.dndSource
    },
    dojo.create("div", {
        id: this.hdfsFileListTreeId,
    },
    this.hdfsFileListContainerId));
    var _currentInstance = this;
    dojo.aspect.around(this.hdfsFileListStore, "put",
    function(originalPut) {
        return function(obj, options) {
            if (options && options.parent) {
                if (options.parent.id != obj.parentPath) {
                    obj.parentPath = options.parent.id;
                    var frompath = obj.path;
                    var topath = obj.parentPath + "/" + obj.name;
                    var filename = obj.name;
                    // TODO:
                    var toitem = _currentInstance.hdfsFileListStore.query({
                        path: obj.parentPath
                    });
                    var toisDerectory = toitem[0].isDirectory;
                    if (toisDerectory == true) {
                        $.ajax({
                            url: _currentInstance.basePath + "hdfs/movefile?frompath=" + frompath + "&topath=" + topath + "&filename=" + filename,
                            type: "GET",
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify({}),
                            success: function(data, status) {
                                if (data == true) _currentInstance.addToConsole("Move success.", false);
                                else _currentInstance.addToConsole("Move failure.", true);
                            },
                            error: function(e) {
                                _currentInstance.addToConsole("Move failure.", true);
                            }
                        });
                    } else {
                        _currentInstance.addToConsole("Can't move to a file.", true);
                    }
                } else {
                    // flow.hdfsFileListStore.put({
                    // id : obj.id,
                    // name : obj.name,
                    // isDirectory : obj.directory,
                    // path : obj.path,
                    // parentPath : obj.parentPath
                    // });
                }
            }
            return originalPut.call(flow.hdfsFileListStore, obj, options);
        };
    });
	//TODO:
//	dojo.aspect.after(this.hdfsFileListStore, "put", function() {
//		if (dijit.byId(_currentInstance.hdfsFileListTreeId) != null) {
//			dijit.registry.remove(_currentInstance.hdfsFileListTreeId);
//		}
//		_currentInstance.getHdfsFileList(_currentInstance.rootPath);
//	});
	if (dijit.byId("treeMenu") != null) {
		dijit.registry.remove("treeMenu");
	}	
	this.menu.treeMenu = new dijit.Menu({
		id : "treeMenu",
		targetNodeIds : [ _currentInstance.hdfsFileListTreeId ],
		selector : ".dijitTreeNode"
	});
	if (dijit.byId("DownloadMenuItem") != null) {
		dijit.registry.remove("DownloadMenuItem");
	}
	this.menu.treeMenu.DownloadMenuItem = new dijit.MenuItem({
		id : "DownloadMenuItem",
		label : myfile.downloadfromHdfs
	});
	if (dijit.byId("CreateMenuItem") != null) {
		dijit.registry.remove("CreateMenuItem");
	}
	this.menu.treeMenu.CreateMenuItem = new dijit.MenuItem({
		id : "CreateMenuItem",
		label : myfile.createnewdirectory
	});
	if (dijit.byId("DeleteMenuItem") != null) {
		dijit.registry.remove("DeleteMenuItem");
	}
	this.menu.treeMenu.DeleteMenuItem = new dijit.MenuItem({
		id : "DeleteMenuItem",
		label : myfile.delete_
	});
	if (dijit.byId("UploadMenuItem") != null) {
		dijit.registry.remove("UploadMenuItem");
	}
	this.menu.treeMenu.UploadMenuItem = new dijit.MenuItem({
		id : "UploadMenuItem",
		label : myfile.uploadfilestoHdfs
	});
	if (dijit.byId("RenameMenuItem") != null) {
		dijit.registry.remove("RenameMenuItem");
	}
	this.menu.treeMenu.RenameMenuItem = new dijit.MenuItem({
		id : "RenameMenuItem",
		label : myfile.rename
	});
	if (dijit.byId("RefreshMenuItem") != null) {
		dijit.registry.remove("RefreshMenuItem");
	}
	this.menu.treeMenu.RefreshMenuItem = new dijit.MenuItem({
		id : "RefreshMenuItem",
		label : myfile.refresh
	});
	if(dijit.byId("CopyHdfsMenuItem")!=null){
		dijit.registry.remove("CopyHdfsMenuItem");
	}
	this.menu.treeMenu.CopyHdfsMenuItem= new dijit.MenuItem({
		id:"CopyHdfsMenuItem",
		label:myfile.copyHdfsPath
	});
    this.menu.treeMenu.addChild(this.menu.treeMenu.DownloadMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.CreateMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.DeleteMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.UploadMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.RenameMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.RefreshMenuItem);
    this.menu.treeMenu.addChild(this.menu.treeMenu.CopyHdfsMenuItem);
    //added by dawn
    dojo.connect(this.menu.treeMenu.CopyHdfsMenuItem,"onClick",function(){
    	 var tn = dijit.byNode(this.getParent().currentTarget);
         
    	 _currentInstance.hdfspath = tn.item.path;
    });
    dojo.connect(
    		
    this.menu.treeMenu.UploadMenuItem, "onClick",
    function() {
        var tn = dijit.byNode(this.getParent().currentTarget);
        var path = tn.item.path;
        var isDirectory = tn.item.isDirectory;
        if (isDirectory == true) {
            var dialog = new dijit.Dialog({
                title: "upload",
                content: "<form id=\"hdfsfilepath\" action=\"hdfs/upload\" enctype=\"multipart/form-data\" method=\"post\">" + "<input type=\"file\" name=\"file\" id=\"file\" />" + "<input type=\"hidden\" name=\"remotePath\" value=" + "\"" + path + "\">" + " <button type=\"button\" id=\"upload_btn\">submit</button></form><div id=\"debug\"><div>",
                style: "width:400px"
            });

            dialog.show();
            dojo.connect(dojo.byId("upload_btn"), "onclick",
            function() {
                var file = document.getElementById("file").files[0];
                var lastModifiedDate = file.lastModifiedDate;
                var size = file.size;
                var type = file.type;
                var filename = document.getElementById("file").value;
                var result = _currentInstance.hdfsFileListStore.query({
                    path: path + "/" + filename
                });
                if (result.total == 0) {
                    dojo.io.iframe.send({
                        form: "hdfsfilepath",
                        handleAs: "xml",
                        url: _currentInstance.basePath + "/hdfs/upload?remotePath=" + path,
                        load: function(response) {
                            var success = response.getElementsByTagName("success")[0].childNodes[0].nodeValue;
                            var filename = response.getElementsByTagName("filename")[0].childNodes[0].nodeValue;
                            if (success == "true") {
                                _currentInstance.addToConsole("Upload scceess.", false);
                                _currentInstance.hdfsFileListStore.put({
                                    id: path + "/" + filename,
                                    name: filename,
                                    isDirectory: false,
                                    path: path + "/" + filename,
                                    parentPath: path,
                                    size: size,
                                    type: type,
                                    time: lastModifiedDate
                                });
                            } else{
                            	_currentInstance.addToConsole("Upload failure.", true);
                            }
                        },
                        error: function(e) {
                        	_currentInstance.addToConsole("Upload failure.", true);
                        }
                    });
                } else {
                	_currentInstance.addToConsole("File exits.", true);
                }
                dialog.destroy();
            });
        } else{
        	_currentInstance.addToConsole( "It's a file.Can't upload to it.", true);
        }
    });
    dojo.connect(this.menu.treeMenu.DeleteMenuItem, "onClick",
    function() {
        var tn = dijit.byNode(this.getParent().currentTarget);
        var path = tn.item.path;
        var isDirectory = tn.item.isDirectory;
        var dialog = new dijit.Dialog({
            id: "dialog_assure",
            title: "Delete",
            content: "<div>Are you sure to delete?<br><button type=\"button\" id=\"assure_btn\">Yes</button><button type=\"button\" id=\"cancel_btn\">No</button></br></div>",
            style: "width:200px"
        });
        dojo.connect(dojo.byId("assure_btn"), "onclick",
        function() {
            if (isDirectory == true) $.ajax({
                url: _currentInstance.basePath + "hdfs/deletedirectory?remotepath=" + path,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({}),
                success: function(data, status) {
                    if (data.success = true) {
                    	_currentInstance.addToConsole("HdfsFile Directory removed.", false);
                    } else{
                    	_currentInstance.addToConsole("HdfsFile Directory can't be removed.", true);
                    }
                    var file_item = _currentInstance.hdfsFileListStore.query({
                        parentPath: path
                    });
                    var i;
                    for (i = 0; i < file_item.length; i++) {
                        _currentInstance.hdfsFileListStore.remove(file_item[i].id);
                    }
                    var directory_item = _currentInstance.hdfsFileListStore.query({
                        path: path
                    });
                    _currentInstance.hdfsFileListStore.remove(directory_item[0].id);
                },
                error: function(request, status, error) {
                	_currentInstance.addToConsole("An error occurred while removing HdfsFile Directory: " + error, true);
                }
            });
            else $.ajax({
                url: _currentInstance.basePath + "hdfs/deletefile?remotepath=" + path,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify({}),
                success: function(data, status) {
                    if (data.success = true) {
                    	_currentInstance.addToConsole("HdfsFile removed.", false);
                        if (dijit.byId("hdfsContainerPane_" + path) != null) _currentInstance.ui.centerContainer.removeChild(dijit.byId("hdfsContainerPane_" + path));
                    } else{
                    	_currentInstance.addToConsole("HdfsFile can't be removed.", true);
                    }
                    var item = _currentInstance.hdfsFileListStore.query({
                        path: path
                    });
                    _currentInstance.hdfsFileListStore.remove(item[0].id);
                },
                error: function(request, status, error) {
                	_currentInstance.addToConsole("An error occurred while removing HdfsFile: " + error, true);
                }
            });
            dialog.destroy();
        });
        dojo.connect(dojo.byId("cancel_btn"), "onclick",
        function() {
            dialog.destroy();
        });
        dialog.show();
    });

    dojo.connect(
    // TODO:
    this.menu.treeMenu.CreateMenuItem, "onClick",
    function() {
        var tn = dijit.byNode(this.getParent().currentTarget);
        var path = tn.item.path;
        var isDirectory = tn.item.isDirectory;
        if (isDirectory == true) {
            var context = "";
            context += "<html><body><form id=\"hdfsfilepath\" method=\"post\">";
            context += "new name:<input type=\"text\" id=\"directoryname\" name=\"directoryname\"> </input>";
            context += " <button type=\"button\" id=\"create_btn\">submit</button></form></body></html>";
            var dialog = new dijit.Dialog({
                title: "create new directory",
                content: context
            });
            dialog.show();
            dojo.connect(dojo.byId("create_btn"), "onclick",
            function() {
                var directoryname = document.getElementById("directoryname").value;
                var result = _currentInstance.hdfsFileListStore.query({
                    path: path + "/" + directoryname
                });
                if (result.total == 0) {
                    $.ajax({
                        url: _currentInstance.basePath + "hdfs/createdirectory?remotepath=" + path + "&directoryname=" + dojo.byId("directoryname").value,
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({}),
                        success: function(data, status) {
                            if (data.success = true) {
                            	_currentInstance.addToConsole("HdfsFile Directory created.", true);
                                _currentInstance.hdfsFileListStore.put({
                                    id: path + "/" + data.directoryname,
                                    name: data.directoryname,
                                    isDirectory: true,
                                    path: path + "/" + data.directoryname,
                                    parentPath: path,
                                });

                            } else{
                            	_currentInstance.addToConsole("HdfsFile Directory can't be created.", true);
                            }
                        },
                        error: function(request, status, error) {
                        	_currentInstance.addToConsole("An error occurred while removing HdfsFile Directory: " + error, true);
                        }
                    });
                } else {
                	_currentInstance.addToConsole("HdfsFile Directory exits.", true);
                }
                dialog.destroy();

            });
        } else {
        	_currentInstance.addToConsole("Create HdfsFile Directory" + "It's a file.HdfsFile Directory can't be created in it.", true);
        }

    });
    dojo.connect(this.menu.treeMenu.DownloadMenuItem, "onClick",
    function() {
        var tn = dijit.byNode(this.getParent().currentTarget);
        var path = tn.item.path;
        var name = tn.item.name;
        var isDirectory = tn.item.isDirectory;
        if (isDirectory == false) {
            var form = $("<form>");

            form.attr('style', 'display:none');
            form.attr('target', '');

            form.attr('method', 'post');

            form.attr('action', "/haflow/hdfs/download");

            form.attr('id', "form1");

            var input1 = $('<input>');
            input1.attr('id', 'input1');

            input1.attr('type', 'hidden');

            input1.attr('name', 'remotepath');

            input1.attr('value', path);

            var input2 = $('<input>');

            input2.attr('type', 'hidden');

            input2.attr('name', 'filename');

            input2.attr('value', name);

            $('body').append(form);

            form.append(input1);
            form.append(input2);
            form.submit();
            $("#form1").ajaxForm(function() {
            	_currentInstance.addToConsole( "Succeed to download it.", false);
            });
        } else {
        	_currentInstance.addToConsole( "It's a directory.Can't download it.", true);
        }
    });

    dojo.connect(this.menu.treeMenu.RenameMenuItem, "onClick",
    function() {
        if (dijit.byId("newname_btn") != null) {
            dijit.registry.remove("newname_btn");
        }
        if (dijit.byId("newname") != null) {
            dijit.registry.remove("newname");
        }
        var renamedialog = new dijit.Dialog({
            title: "Rename",
            content: "<html><body><form id=\"rename\" method=\"post\">" + "new name:<input type=\"text\" id=\"newname\" name=\"newname\"> </input>" + " <button type=\"button\" id=\"newname_btn\">submit</button></form></body></html>"
        });
        renamedialog.show();
        var tn = dijit.byNode(this.getParent().currentTarget);
        var path = tn.item.path;
        var parentpath = tn.item.parentPath;
        dojo.connect(dojo.byId("newname_btn"), "onclick",
        function() {
            var newname = document.getElementById("newname").value;
            if (newname != null) {
                var result = _currentInstance.hdfsFileListStore.query({
                    path: path + "/" + newname
                });
                var newpath = parentpath + "/" + newname;
                if (result.total == 0) {
                    $.ajax({
                        url: _currentInstance.basePath + "hdfs/rename?path=" + path + "&newpath=" + newpath,
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({}),
                        success: function(data, status) {
                            if (data.success = true) {
                            	_currentInstance.addToConsole("Succeed to rename.", false);
                                var newparentpath = parentpath;
                                var items = _currentInstance.hdfsFileListStore.query({
                                    path: path
                                });
                                var newhfdname = newname;
                                var child = items[0];
                                _currentInstance.changepath(_currentInstance, child, newparentpath, newhfdname);
                            } else {
                            	_currentInstance.addToConsole("Can't rename.", false);
                            }
                        },
                        error: function(request, status, error) {
                        	_currentInstance.addToConsole("An error occurred while renaming: " + error, true);
                        }
                    });
                } else {
                	_currentInstance.addToConsole("It exits.", true);
                }
            }
            renamedialog.destroy();
        });
    });
    dojo.connect(this.menu.treeMenu.RefreshMenuItem, "onClick",
    function() {
        if (dijit.byId(_currentInstance.hdfsFileListTreeId) != null) {
            dijit.registry.remove(_currentInstance.hdfsFileListTreeId);
        }
        _currentInstance.getHdfsFileList(_currentInstance.rootPath);
    });

    this.menu.treeMenu.startup();
    tree.on("click",
    function(item) {
        if (item.directory == "true") {

        } else {
            _currentInstance.hdfspath = item.path;
            var information = [];
            information.name = item.name;
            information.path = item.path;
            information.size = item.size;
            information.time = item.time;
            _currentInstance.onFileClicked(_currentInstance, information);
        }
    },
    true);
    var picture = new RegExp("^[A-Za-z0-9_]*\.jpg$");
    var text = new RegExp("^[A-Za-z0-9_]*\.(txt|ini)$");
    var csv = new RegExp("^[A-Za-z0-9_-]*\.csv$");
    tree.on("dblclick",
    function(item) {
        if (item.isDirectory == true) {

        } else {
            if (picture.test(item.name)) {
                _currentInstance.getHdfsPicture(item.parentPath, item.name);
            } else if (text.test(item.name)) {
                var url = item.parentPath + "/" + item.name;
                if (dijit.byId("hdfsContainerPane_" + url) == null) {
                    _currentInstance.getHdfsFile(item.parentPath, item.name);
                } else {
                    _currentInstance.ui.centerContainer.removeChild(dijit.byId("hdfsContainerPane_" + url));
                    dijit.registry.remove("hdfsContainerPane_" + url);
                    _currentInstance.getHdfsFile(item.parentPath, item.name);
                }
            } else if (csv.test(item.name)) {
                _currentInstance.getHdfsCsv(item.parentPath, item.name);
            }else{
            	_currentInstance.addToConsole("Can't read it.", true);
            }
        }
    },
    true);

    tree.startup();
};

// HDFS operation
HAFlow.Main.prototype.getHdfsFile = function(path, fileName) {
    var _currentInstance = this;
    var url = path + "/" + fileName;
    $.ajax({
        url: this.basePath + "hdfs/file",
        type: "GET",
        dataType: "json",
        data: {
            path: path,
            fileName: fileName
        },
        success: function(data, status) {
            var content = data.content;
            content = content.replace(/\r\n/ig, "<br>");
            var length = content.split("<br>").length;
            if (length < 100) {
                var contentPane = new dijit.layout.ContentPane({
                    id: "hdfsContainerPane_" + url,
                    title: fileName,
                    content: "<div id=\"hdfsContainer_" + url + "\">" + content + "</div>",
                    closable: true,
                    onClose: function() {
                        dijit.registry.remove("hdfsContainerPane_" + url);
                        return true;
                    }
                });
                _currentInstance.ui.centerContainer.addChild(contentPane);

                _currentInstance.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + url));
            } else {
                if (dijit.byId("setreadline") != null) {
                    dijit.registry.remove("setreadline");
                }
                if (dojo.byId("setreadline_btn") != null) {
                    dijit.registry.remove("setreadline_btn");
                }
                if (dojo.byId("start") != null) {
                    dijit.registry.remove("start");
                }
                var setreadlinedialog = new dijit.Dialog({
                    id: "setreadline",
                    title: "Set Read Line",
                    content: "<html><body><form id=\"setreadline\" method=\"post\">" + "start with line:<input type=\"text\" id=\"start\" name=\"newname\"> </input>" + " <button type=\"button\" id=\"setreadline_btn\">submit</button></form></body></html>"
                });
                setreadlinedialog.show();
                dojo.connect(dojo.byId("setreadline_btn"), "onclick",
                function() {
                    var startline = document.getElementById("start").value - 1;
                    if (length < startline){
                    	_currentInstance.addToConsole("It has only " + length + "line!", true);
                    } else {
                        var tmp = content;
                        var count = 0;
                        for (var i = 0; i < startline; i++) {
                            var start = tmp.indexOf("<br>");
                            tmp = tmp.slice(start + 4);
                        }
                        content = tmp;
                        if (length - startline + 1 > 100) {
                            for (var i = 0; i < 100; i++) {
                                var start = tmp.indexOf("<br>");
                                tmp = tmp.slice(start + 4);
                                count = start + count + 4;
                            }
                            content = content.substring(0, count);
                        }
                        var contentPane = new dijit.layout.ContentPane({
                            id: "hdfsContainerPane_" + url,
                            title: fileName,
                            content: "<div id=\"hdfsContainer_" + url + "\">" + content + "</div>",
                            closable: true,
                            onClose: function() {
                                dijit.registry.remove("hdfsContainerPane_" + url);
                                return true;
                            }
                        });
                        _currentInstance.ui.centerContainer.addChild(contentPane);

                        _currentInstance.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + url));
                    }
                    setreadlinedialog.destroy();
                });
            }

        },
        error: function(request, status, error) {
            _currentInstance.addToConsole("An error occurred while reading hdfs file: " + error, true);
        }
    });
};

HAFlow.Main.prototype.getHdfsPicture = function(path, fileName) {
    var url = this.basePath + "hdfs/picture" + "?path=" + path + "&fileName=" + fileName;
    if (dijit.byId("hdfsContainerPane_" + path + "/" + fileName) == null) {
        var text = "";
        text += "<div id=\"hdfsContainer_" + url + "\"><img src=\"" + url + "\"/>";
        text += "</div>";
        var contentPane = new dijit.layout.ContentPane({
            id: "hdfsContainerPane_" + path + "/" + fileName,
            title: fileName,
            content: text,
            closable: true,
            onClose: function() {
                dijit.registry.remove("hdfsContainerPane_" + path + "/" + fileName);
                return true;
            }
        });
        this.ui.centerContainer.addChild(contentPane);
        this.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + path + "/" + fileName));
    } else this.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + path + "/" + fileName));
};

HAFlow.Main.prototype.getHdfsCsv = function(path, fileName) {
    var _currentInstance = this;
    var url = this.basePath + "hdfs/cvs_file" + "?path=" + path + "/" + fileName;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "html",
        success: function(data, status) {
            var data_list = JSON.parse(data);
            var length = eval(data_list)[0]["length"];
            var table = "<table border=\"1\" class=\"csvtable\" >";
            table += "<tr class=\"csvtr\">";
            for (var i = 0; i < length; i++) table += "<th class=\"cvstd\">" + eval(data_list)[1][i] + "</th>";
            table += "</tr>";
            for (var line = 2; line < data_list.length; line++) {
                table += "<tr>";
                for (var i = 0; i < length; i++) table += "<td class=\"cvstd\">" + eval(data_list)[line][eval(data_list)[1][i]] + "</td>";
                table += "</tr>";
            }
            table += "</table>";
            if (dijit.byId("hdfsContainerPane_" + path + "/" + fileName) != null) {
            	dijit.byId("hdfsContainerPane_" + path + "/" + fileName).setContent(table);
                _currentInstance.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + path + "/" + fileName));
            } else {
                var contentPane = new dojox.layout.ContentPane({
                    id: "hdfsContainerPane_" + path + "/" + fileName,
                    title: fileName,
                    content: table,
                    closable: true,
                    onClose: function() {
                        dijit.registry.remove("hdfsContainerPane_" + path + "/" + fileName);
                        return true;
                    }

                });
                // contentPane.setHref(url);
                _currentInstance.ui.centerContainer.addChild(contentPane);
                _currentInstance.ui.centerContainer.selectChild(dijit.byId("hdfsContainerPane_" + path + "/" + fileName));
            }
        },
        error: function(request, status, error) {
            _currentInstance.addToConsole("An error occurred while reading hdfs file: " + error, true);
        }
    });

};

HAFlow.Main.prototype.refreshHdfsFileList = function(instance, parentPath, data) {
    var i;
    // signal.remove();
    // TODO:
    for (i = 0; i < data.files.length; i++) {
        this.hdfsFileListStore.put({
            id: parentPath + "/" + data.files[i].name,
            name: data.files[i].name,
            isDirectory: data.files[i].directory,
            path: parentPath + "/" + data.files[i].name,
            parentPath: parentPath,
            // type:data.files[i].type,
            size: data.files[i].length,
            time: data.files[i].time
        });
        if (data.files[i].directory) {
            instance.getHdfsFileList(parentPath + "/" + data.files[i].name);
        }
    }
};

HAFlow.Main.prototype.changepath = function(instance, child, newparentpath, newhfdname) {
    instance.hdfsFileListStore.put({
        id: newparentpath + "/" + newhfdname,
        name: newhfdname,
        isDirectory: child.isDirectory,
        path: newparentpath + "/" + newhfdname,
        parentPath: newparentpath,
    });
    var tmp = newparentpath + "/" + newhfdname;
    var newparentpath = tmp;
    var items = instance.hdfsFileListStore.query({
        parentPath: child.path
    });
    if (child.isDirectory == true) {
        for (var i = 0; i < items.total; i++) {
            var childitem = items[i];
            var newhfdname = childitem.name;
            instance.changepath(instance, childitem, newparentpath, newhfdname);
        }
    }
    instance.hdfsFileListStore.remove(child.id);
};

HAFlow.Main.prototype.onFileClicked = function(instance, fileInformation) {
    var text = "";
    text += "<table border=\"0\">";
    text += "<tr style=\"tr\"><th align=\"left\">"+myfile.name+"</th><td>" + fileInformation.name + "</td></tr>";
    text += "<tr style=\"tr\"><th align=\"left\">"+myfile.path+"</th><td>" + fileInformation.path + "</td></tr>";
    text += "<tr style=\"tr\"><th align=\"left\">"+myfile.updateTime+"</th><td>" + fileInformation.time + "</td></tr>";
    text += "<tr style=\"tr\"><th align=\"left\">"+myfile.size+"</th><td>" + fileInformation.size + "B</td></tr>";
    text += "</table>";
    $("#" + instance.informationContainerId).html(text);
    var informationPane = dijit.byId(instance.informationContainerId);
	_currentInstance.ui.bottomContainer.selectChild(informationPane);
};

//TODO for now not used
HAFlow.Main.prototype.onCloseTab_hdfs = function(instance) {
    this.id.replace("hdfsContainerPane_", "");
};
