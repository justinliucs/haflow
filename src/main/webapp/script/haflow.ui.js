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
	this.initMainMenu();
	this.initLeadingContainer();
	this.initCenterContainer();
	this.initTrailingContainer();
	this.initSecondTrailingContainer();
	this.initCenterRightContainer();
	this.initBottomContainer();
	this.initCenterContainerParent();
	this.initMainContainer();
};

HAFlow.UI.prototype.refresh = function() {
	this.mainContainer.layout();
};

HAFlow.UI.prototype.initId = function() {
	this.mainContainerId = "main";
	this.mainMenuContainerId = "mainMenu";
	this.centerRightContainerId="centerRight";
	this.bottomContainerId = "bottom";
	this.leadingContainerId = "leading";
	this.trailingContainerId = "trailing";
	this.secondTrailingContainerId = "secondTrailing";
	this.centerContainerId = "center";
};

HAFlow.UI.prototype.initMainMenu = function() {
	this.mainMenu = new dijit.MenuBar({
		region : "top"
	}, dojo.create("div", {
		id : this.mainMenuContainerId
	}, dojo.body()));
	this.mainMenu.startup();
};

HAFlow.UI.prototype.initLeadingContainer = function() {
	this.leadingContainer = new dijit.layout.TabContainer({
		id : this.leadingContainerId,
		region : "leading",
		splitter : "true"
	});
	this.leadingContainer.startup();
};

HAFlow.UI.prototype.initCenterContainer = function() {
	this.centerContainer = new dijit.layout.TabContainer({
		id : this.centerContainerId,
		region : "center",
		splitter : "true"
	}, dojo.create("div", {
		id : this.centerContainerId
	}, dojo.body()));
	this.centerContainer.startup();
};

HAFlow.UI.prototype.initTrailingContainer = function() {
	this.trailingContainerLoaded = false;
	this.trailingContainer = new dijit.layout.AccordionContainer({
		id : this.trailingContainerId,
		region : "trailing",
		splitter : "true"
	});
	this.trailingContainer.startup();
};

HAFlow.UI.prototype.initSecondTrailingContainer = function() {
	this.secondTrailingContainerLoaded = false;
	this.secondTrailingContainer = new dijit.layout.AccordionContainer({
		id : this.secondTrailingContainerId,
		region : "trailing",
		splitter : "true"
	});
	this.secondTrailingContainer.startup();
};

HAFlow.UI.prototype.initCenterRightContainer = function() {
	this.centerRightContainer = new dijit.layout.BorderContainer({
		id : this.centerRightContainerId,
		region : "center",
		splitter : "true"
	});
	this.centerRightContainer.addChild(this.centerContainer);
//	this.centerRightContainer.addChild(this.trailingContainer);
//	this.centerRightContainer.addChild(this.secondTrailingContainer);
	this.centerRightContainer.startup();
};

HAFlow.UI.prototype.initBottomContainer = function() {
	this.bottomContainer = new dijit.layout.TabContainer({
		id : this.bottomContainerId,
		region : "bottom",
		splitter : "true"
	});
	this.bottomContainer.startup();
};

HAFlow.UI.prototype.initCenterContainerParent = function(){
	this.centerContainerParent = new dijit.layout.BorderContainer({
		region : "center",
		splitter : "true"
	},dojo.create("div", {
		id : "centerparent"
	}, dojo.body()));
	this.centerContainerParent.addChild(this.centerRightContainer);
	this.centerContainerParent.addChild(this.bottomContainer);
	this.centerContainerParent.startup();
};

HAFlow.UI.prototype.initMainContainer = function() {
	this.mainContainer = new dijit.layout.BorderContainer({
		design : "headline",
		style : "padding:5px 5px 15px 5px;"
	}, dojo.create("div", {
		id : this.mainContainerId
	}, dojo.body()));
	this.mainContainer.addChild(this.mainMenu);
	this.mainContainer.addChild(this.leadingContainer);
	this.mainContainer.addChild(this.centerContainerParent);
	this.mainContainer.startup();
};