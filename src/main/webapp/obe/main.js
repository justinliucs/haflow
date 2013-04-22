/***
 * Excerpted from "Mastering Dojo",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/rgdojo for more book information.
***/
dojo.provide("obe.main");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
(function(){
  //define the main program functions...
  var main= obe.main;
  main.startup= function() {
      
    //create a fake menu...
    main.menu= new dijit.layout.ContentPane({
      id: "menu",
      region: "top",
       //height must be given for top/bottom panes...
      style: "height: 2em;"
    });
    main.menu.setContent('menu');
  
    //create a fake navigator...
    main.navigator= new dijit.layout.ContentPane({
      id: "navigator",
      region: "left",
       //width must be given for left/right panes...
      style: "width: 20%; overflow: auto",
      splitter: true    
    });
    main.navigator.setContent('navigator');
  
    //create a fake workspace...
    main.workspace= new dijit.layout.ContentPane({
      id: "workspace",
      region: "center"
      //note, no sizing!
    });
    main.workspace.setContent('workspace');
    
    //create a fake status bar...
    main.status= new dijit.layout.ContentPane({
      id: "status",
      region: "bottom",
       //height must be given for top/bottom panes...
      style: "height: 2em;"
    });
    main.status.setContent('status');
  
    //create the main application container....      
    var appContainer= main.appContainer= new dijit.layout.BorderContainer({
      //fill up the viewport...
      style: "width: 100%; height: 100%",
      design: "headline"
    });
    
    //finally, destroy the loading message and show it all...
    dojo._destroyElement(dojo.byId("bafLoading"));
    dojo.place(appContainer.domNode, dojo.body(), "first");
    appContainer.addChild(main.menu);
    appContainer.addChild(main.status);
    appContainer.addChild(main.navigator);
    appContainer.addChild(main.workspace);
    
    //tell the container to recalculate its layout...
    appContainer.layout();
    
    window.onresize= function(){
      appContainer.layout();    
    };
  };
})();//(function(){
