"use strict"; 

/* 
	MainContainer 
	
	this will build the synopsis panel.  
*/
var MainContainer = base.Component.extend(
{ 
	render: function()
	{
		return { 
			className: 'main-container', 
			children: 
			[
				{ 
					className: 'header-container',  
					
					/* this will add the header child component */ 
					header: this.cache('header', new HeaderPanel())
				}, 
				this.cache('mainBody', 
				{ 
					className: 'main-body-container', 
					switch: 
					[
						this.addRoute('/', HomePanel, 'EXPLORE'), 
						this.addRoute('/synopsis/:id?', SynopsisPanel, 'SYNOPSIS'), 
						this.addRoute('/cast/:id?', CastPanel, 'CAST'), 
						this.addRoute('/gallery/:id?', GalleryPanel, 'GALLERY') 
					]
				})
			]
		};
	}, 
	
	addRoute: function(uri, component, title)
	{
		return {
			uri: uri, 
			component: component, 
			title: title
		}; 
	}, 
	
	getBodyPanel: function()
	{ 
		return this.mainBody; 
	}
}); 