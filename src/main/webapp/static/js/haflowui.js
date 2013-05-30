dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");

function HAFlowUI() {

};

HAFlowUI.prototype.init = function() {
	this.initId();
	this.initMainContainer();
	this.initMainMenu();
	this.initBottomContainer();
	this.initLeadingContainer();
	this.initTrailingContainer();
	this.initCenterContainer();
};

HAFlowUI.prototype.refresh = function() {
	this.mainContainer.layout();
};

HAFlowUI.prototype.initId = function() {
	this.mainContainerId = "main";
	this.mainMenuContainerId = "mainMenu";
	this.bottomContainerId = "bottom";
	this.leadingContainerId = "leading";
	this.trailingContainerId = "trailing";
	this.centerContainerId = "center";
};

HAFlowUI.prototype.initMainContainer = function() {
	this.mainContainer = new dijit.layout.BorderContainer({
		design : "headline"
	}, dojo.create("div", {
		id : this.mainContainerId
	}, dojo.body()));
	this.mainContainer.startup();
};

HAFlowUI.prototype.initMainMenu = function() {
	this.mainMenu = new dijit.MenuBar({
		region : "top"
	}, dojo.create("div", {
		id : this.mainMenuContainerId
	}, dojo.body()));
	this.mainContainer.addChild(this.mainMenu);
	this.mainMenu.startup();
};

HAFlowUI.prototype.initBottomContainer = function() {
	this.bottomContainer = new dijit.layout.TabContainer({
		id : this.bottomContainerId,
		region : "bottom",
		splitter : "true"
	});
	this.mainContainer.addChild(this.bottomContainer);
	this.bottomContainer.startup();
};

HAFlowUI.prototype.initLeadingContainer = function() {
	this.leadingContainer = new dijit.layout.TabContainer({
		id : this.leadingContainerId,
		region : "leading",
		splitter : "true"
	});
	this.mainContainer.addChild(this.leadingContainer);
	this.leadingContainer.startup();
};

HAFlowUI.prototype.initTrailingContainer = function() {
	this.trailingContainer = new dijit.layout.TabContainer({
		id : this.trailingContainerId,
		region : "trailing",
		splitter : "true"
	});
	this.mainContainer.addChild(this.trailingContainer);
	this.trailingContainer.startup();
};

HAFlowUI.prototype.initCenterContainer = function() {
	this.centerContainer = new dijit.layout.TabContainer({
		id : this.centerContainerId,
		region : "center",
		splitter : "true"
	});
	this.mainContainer.addChild(this.centerContainer);
	this.centerContainer.startup();
};