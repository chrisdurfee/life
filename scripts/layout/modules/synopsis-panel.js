"use strict"; 

/* 
	SynopsisPanel 
	
	this will build the synopsis panel.  
*/
var SynopsisPanel = MainPanel.extend(
{ 
	beforeSetup: function()
	{
		base.state.set('header', 'dark', true); 
	}, 

	render: function()
	{ 
		return MainSection(
		{
			className: 'synopsis-panel', 
			children: 
			[ 
				{ 
					className: 'col col-image'
				},
				{ 
					className: 'col col-content',
					textContainer: 
					{ 
						className: 'text-container',
						children: this.addContent()
					}
				}
			]
		}); 
	}, 
	
	addContent: function()
	{
		return [
			H1(
			{ 
				innerHTML: 'grabs you and<br>doesn\'t let go'
			}),
			H2(
			{ 
				text: 'Synopsis'
			}),
			P({
				text: 'Life is a terrifying sci-fi thriller about a team of scientists aboard the International Space Station whose mission of discovery turns to one of primal fear when they find a rapidly evolving life form that caused extinction on Mars, and now threatens the crew and all life on Earth.', 
				className: 'synopsis-paragraph'					
			})
		]; 
	}, 

	beforeDestroy: function()
	{
		base.state.set('header', 'dark', false); 
	}
});