"use strict"; 

var ScrollPanel = MainPanel.extend(
{ 
	setupAutoScroller: function()
	{ 
		var autoScroller = this.autoScroller = new AutoScroller('', this.getId()); 
		autoScroller.setup();
	}, 

	afterSetup: function()
	{ 
		this.setupAutoScroller();  
	}, 

	beforeDestroy: function()
	{ 
		this.autoScroller.remove(); 
	}
});