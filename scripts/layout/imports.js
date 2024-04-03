"use strict"; 
			
var add = function(src, defer)
{
	scriptLoader.add({src: src, defer: defer});
}; 

/* this will load in the framework and modules */  
add('scripts/base/base.js', false); 
add('scripts/base/animation.js'); 

/* models */ 
var modelUrl = 'scripts/models/';
add(modelUrl + '/main-model.js');
add(modelUrl + '/cast-model.js');

var url = 'scripts/layout/';

/* controls */ 
add(url + 'controls/auto-scroller.js');
add(url + 'controls/navigation.js');

/* atoms */
add(url + 'atoms/atoms.js');

/* modules */ 
add(url + 'modules/main-panel.js');
add(url + 'modules/home-panel.js');
add(url + 'modules/synopsis-panel.js');
add(url + 'modules/scroll-panel.js');
add(url + 'modules/cast-panel.js'); 
add(url + 'modules/gallery-panel.js'); 

/* app components */ 
add(url + 'main/header-panel.js');
add(url + 'main/main-container.js');

/* this is sthemain script used to start the 
app */ 
add(url + 'main-controller.js');
add(url + 'app-controller.js');