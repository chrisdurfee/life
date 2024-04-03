"use strict"; 

var MainController = base.Class.extend(
{ 
	constructor: function()
	{ 
		this.router = null;
		this.mainContainer = null; 
	}, 
	
	getRouterSettings: function()
	{ 
		return {
			baseUrl: '/', 
			title: 'LIFE'
		}; 
	},  

	/* this will setup the app router */ 
	setupRouter: function() 
	{ 
		var settings = this.getRouterSettings(), 
		baseUrl = settings.baseUrl; 
		
		var router = this.router = base.router; 
		router.setup(baseUrl, settings.title);   

		/* this will modify the base tag to ref from 
		the base url for all xhr */ 
		this.updateBaseTag(baseUrl);
	}, 
	
	updateBaseTag: function(url)
	{ 
		/* this will modify the base tag to ref from 
		the base url for all xhr */ 
		var ele = document.getElementsByTagName('base'); 
		if(ele.length) 
		{ 
			ele[0].href = url; 
		}
	}, 
	
	getRoutes: function()
	{ 
		return [
			//['/', 'HomePanel', '', 'EXPLORE'],
		]; 
	}, 

	/* this will navigate the router to the uri. 
	@param (string) uri = the relative uri 
	@param [(object)] data = a data object that will 
	be added to the history state object
	@param [(bool)] replace = replace the state
	@return (object) a referenceto the router object */ 
	navigate: function(uri, data, replace) 
	{
		this.router.navigate(uri, data, replace); 
	},   
	
	setupMainContainer: function()
	{ 
		var main = this.mainContainer = new MainContainer(); 
		main.setup(document.body); 
	}, 
	
	getMainBody: function()
	{ 
		return this.mainContainer.getBodyPanel(); 
	}, 

	setup: function()
	{ 
		this.setupRouter(); 		
		this.setupMainContainer();
	}
}); 