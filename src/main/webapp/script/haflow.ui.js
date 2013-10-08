dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.AccordionContainer");

dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");
dojo.require("dijit.MenuBar");
dojo.require("dijit.MenuBarItem");
dojo.require("dijit.PopupMenuBarItem");

HAFlow.UI = function() {

};

HAFlow.UI.prototype.init = function() {
	this.initId();
	this.initMainContainer();
	this.initMainMenu();
	this.initMainoozieContainer();
	this.initLeadingContainer();
	this.initTrailingContainer();
	this.initCenterContainer();
	this.initBottomContainer();
};

HAFlow.UI.prototype.refresh = function() {
	this.mainContainer.layout();
};

HAFlow.UI.prototype.initId = function() {
	this.mainContainerId = "main";
	this.mainMenuContainerId = "mainMenu";
	this.mainoozieContainerId="mainoozie";
	this.bottomContainerId = "bottom";
	this.leadingContainerId = "leading";
	this.trailingContainerId = "trailing";
	this.centerContainerId = "center";
};

HAFlow.UI.prototype.initMainContainer = function() {
	this.mainContainer = new dijit.layout.BorderContainer({
		design : "headline"
	}, dojo.create("div", {
		id : this.mainContainerId
	}, dojo.body()));
	this.mainContainer.startup();
};

HAFlow.UI.prototype.initMainMenu = function() {
	this.mainMenu = new dijit.MenuBar({
		region : "top"
	}, dojo.create("div", {
		id : this.mainMenuContainerId
	}, dojo.body()));
	this.mainContainer.addChild(this.mainMenu);
	this.mainMenu.startup();
};

HAFlow.UI.prototype.initMainoozieContainer = function() {
	this.mainoozieContainer = new dijit.layout.BorderContainer({
		id : this.mainoozieContainerId,
		region : "center",
		splitter : "true"
	});
	this.mainContainer.addChild(this.mainoozieContainer);
	this.mainoozieContainer.startup();
};

HAFlow.UI.prototype.initBottomContainer = function() {
	this.bottomContainer = new dijit.layout.TabContainer({
		id : this.bottomContainerId,
		region : "bottom",
		splitter : "true"
	});
	this.centerContainerParent.addChild(this.bottomContainer);
	this.bottomContainer.startup();
};

HAFlow.UI.prototype.initLeadingContainer = function() {
	this.leadingContainer = new dijit.layout.TabContainer({
		id : this.leadingContainerId,
		region : "leading",
		splitter : "true"
	});
	this.mainoozieContainer.addChild(this.leadingContainer);
	this.leadingContainer.startup();
};

HAFlow.UI.prototype.initTrailingContainer = function() {
	this.trailingContainer = new dijit.layout.AccordionContainer({
		id : this.trailingContainerId,
		region : "trailing",
		splitter : "true"
	});
	this.mainoozieContainer.addChild(this.trailingContainer);
	this.trailingContainer.startup();
};

HAFlow.UI.prototype.initCenterContainer = function() {
	this.centerContainerParent = new dijit.layout.BorderContainer({
		region : "center",
		splitter : "true"
	});
	this.centerContainer = new dijit.layout.TabContainer({
		id : this.centerContainerId,
		region : "center",
		splitter : "true"
	});
	this.mainoozieContainer.addChild(this.centerContainerParent);
	this.centerContainerParent.addChild(this.centerContainer);
	this.centerContainerParent.startup();
	this.centerContainer.startup();
};