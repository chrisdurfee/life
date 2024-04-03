"use strict"; 

var AppController = MainController.extend(
{ 
	getRouterSettings: function()
	{ 
		return {
			baseUrl: '/life/', 
			title: 'LIFE'
		}; 
	}, 
	
	/*getRoutes: function()
	{ 
		return [
			['/', HomePanel, '', 'EXPLORE'], 
			['/synopsis/:id?', SynopsisPanel, '', 'SYNOPSIS'], 
			['/cast/:id?', CastPanel, '', 'CAST'],
			['/gallery/:id?', GalleryPanel, '', 'GALLERY']
		]; 
	},*/ 

	getNavOptions: function()
	{ 
		return [
			{
				id: 'home', 
				label: 'EXPLORE', 
				href: '/'
			},
			{
				id: 'synopsis', 
				label: 'SYNOPSIS', 
				href: 'synopsis'
			}, 
			{
				id: 'cast', 
				label: 'CAST', 
				href: 'cast'
			}, 
			{
				id: 'gallery', 
				label: 'GALLERY', 
				href: 'gallery'
			}
		];
	}
}); 