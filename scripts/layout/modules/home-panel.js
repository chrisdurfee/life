"use strict"; 

/* 
	HomePanel 
	
	this will build the synopsis panel.  
*/
var HomePanel = MainPanel.extend(
{ 
	render: function()
	{ 
		return MainSection(
		{
			className: 'home-panel', 
			children: 
			[
				{ 
					className: 'video-container',
					video: Video(
					{
						className: 'video', 
						src: 'videos/life-trailer-2.mp4#t=0.26,214"></source>'
					})
				}, 
				{ 
					tag: 'article', 
					className: 'headline-panel',
					headLine: 
					{ 
						tag: 'h1', 
						innerHTML: 'Now Playing<br><span>In Theatres</span>', 
						className: 'headline'
					}, 
					button: Button(
					{ 
						text: 'Watch Trailer'
					})
				}
			]
		}); 
	}
});