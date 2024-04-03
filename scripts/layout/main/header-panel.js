"use strict"; 

/* 
	HeaderPanel 
	
	this will build the Header Panel.  
*/
var HeaderPanel = base.Component.extend(
{ 
	render: function()
	{
		return Header(
		{ 
			onState: ['dark', {
				inner: true
			}], 

			children: 
			[ 
				{ 
					className: 'logo-container',
					link: this.addLogo()
				}, 
				{ 
					className: 'nav-container',
					nav: this.addNav()
				}
			]
		});
	}, 
	
	addLogo: function()
	{ 
		return A(
		{
			className: 'logo',
			href: '/life/',
			children: 
			[
				{
					tag: 'img',
					src: 'images/life-logo.svg'
				}
			]
		}); 
	}, 
	
	addNav: function() 
	{
		var options = app.getNavOptions();  

		return this.cache('nav', new Navigation(
		{
			options: options
		})); 
	}, 

	setupStates: function()
	{
		this.stateTargetId = 'header'; 

		return {
			dark: false
		}; 
	}
}); 