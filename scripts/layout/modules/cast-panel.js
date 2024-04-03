"use strict";  

var Cast = base.Component.extend(
{ 
	render: function()
	{ 
		var className = this.data.get('className'); 
		
		return {
			className: 'cast-container ' + className, 
			article: 
			{ 
				tag: 'article', 
				className: 'cast-bio-container',
				children: 
				[
					H1(
					{ 
						children: 
						[
							Span('firstName'), 
							Br(), 
							Span('lastName')
						]
					}), 
					H2(
					{ 
						text: 'Cast'
					}), 
					P({ 
						bind: 'text'
					})
				]
			}
		}; 
	}
}); 

/* 
	CastPanel 
	
	this will build the cast panel.  
*/
var CastPanel = ScrollPanel.extend(
{ 
	render: function()
	{ 
		return MainSection(
		{
			className: 'cast-panel', 
			children: 
			[
				this.addCast(
					'first', 
					'Ryan', 
					'Reynolds', 
					'Rory "Roy" Adams, American, system engineer'
				), 
				this.addCast(
					'second', 
					'Rebecca', 
					'Ferguson', 
					'Dr. Miranda North, British, Quarantine officer'
				), 
				this.addCast(
					'third', 
					'Jake', 
					'Gyllenhaal', 
					'Dr. David Jordan, American, senior medical officer'
				)
			]
		}); 
	}, 
	
	addCast: function(className, firstName, lastName, text)
	{ 
		/* we want to create a model with the cast data 
		to pass to the child component */ 
		return new Cast(
		{
			data: new CastModel(
			{ 
				firstName: firstName, 
				lastName: lastName, 
				text: text,
				className: className
			})
		});  
	}
});