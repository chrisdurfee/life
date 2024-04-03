"use strict"; 

var GalleryImage = function(props)
{
	return {
		id: props.id, 
		className: 'cast-container ' + props.className, 
		'data-id': props.dataId || null
	}; 
}; 

/* 
	GalleryPanel 
	
	this will build the gallery panel.  
*/
var GalleryPanel = ScrollPanel.extend(
{ 
	render: function()
	{ 
		return MainSection(
		{
			className: 'gallery-panel', 
			children: 
			[
				this.add('first', 'first', 'Ryan Reynolds'), 
				this.add('second', 'second'), 
				this.add('third', 'third'), 
				this.add('fourth', 'fourth'), 
				this.add('fifth', 'fifth'), 
				this.add('sixth', 'sixth'), 
				this.add('seventh', 'seventh'), 
				this.add('eighth', 'eighth'), 
				this.add('ninth', 'ninth')
			]
		}); 
	}, 
	
	add: function(id, className, dataId)
	{ 
		return GalleryImage(
		{ 
			id: this.getId(id), 
			className: className, 
			'data-id': dataId
		});
	}
});