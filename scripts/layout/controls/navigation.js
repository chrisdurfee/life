"use strict"; 

var Navigation = base.Component.extend(
{
	createLink: function(option)
	{ 
		return { 
			tag: 'li',  
			a: new NavLink(
			{ 
				href: option.href, 
                text: option.label, 
                activeClass: 'selected'
			})
		}; 
	}, 
	
	createLinks: function()
	{ 
		var option, links = []; 
		
		var options = this.options; 
		for(var i = 0, length = options.length; i < length; i++)
		{ 
			option = options[i]; 
			links.push(this.createLink(option)); 
		}
		return links; 
	}, 
	
	render: function() 
	{ 
		return { 
			tag: 'nav', 
			className: 'nav', 
			ul: 
			{ 
				tag: 'ul', 
				children: this.createLinks()
			}
		};
	}
});