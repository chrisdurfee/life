/* 
	autoScroller
	
	this will add all panels with the scene_container to 
	an autoscroll object that will allow users to mouse, 
	keyboard, or swipe to select a scene and remove the 
	previous scene or next scene. When a scene gets selected 
	it will add an amimate class to the scene to start any 
	animations in the panel. 
	
	When the panel is in desktop mode it will scroll  to the 
	selected option but in mobile mode it will allow the user 
	to scroll. 
	
	@param (string) header = the header id 
	@param (string) container = the container id 
	@param [(string)] sceneClassName = the scene class name or 
	if left blank it will use the default 'scene_container' 
*/ 
var AutoScroller = base.htmlBuilder.extend({
	
	constructor: function(header, container, sceneClassName) 
	{ 
		this.lastSelectedOption = null;     
		this.optionsArray = [];   
		this.conversionLabels = []; 

		/* this is the class name of the scene 
		containers that will be included in 
		the scroll panel */ 
		this.sceneClassName = sceneClassName || 'cast-container'; 

		/* this is the size that will change from 
		auto scroll to mobile scroll */ 
		this.mobileSize = 720; 
		this.touch = false; 

		/* this will change the way the auto scroller 
		because of window size */ 
		this.scrollMode = null; 
		
		this.container = container; 
		this.init(); 

		/* this is the page header id */ 
		this.header = header; 
	}, 
	
	/* this will setup the component number and unique 
	instance id for the component elements. */ 
	init: function()
	{
		var constructor = this.constructor; 
		this.number = (typeof constructor.number === 'undefined')? constructor.number = 0 : (++constructor.number);

		this.id = 'auto-scroller-' + this.number; 
	}, 
	
	setupBinds: function()
	{ 
		this.mouseBind = base.bind(this, this.mouseWheel); 
		this.keyBind = base.bind(this, this.keyPress); 
		this.resizeBind = base.bind(this, this.setScrollModeBySize); 
		this.scrollBind = base.bind(this, this.checkScroll); 
	}, 
	
	addMouseWheelSupport: function() 
	{ 
		base.onMouseWheel(this.mouseBind, document); 
	},
	
	mouseWheel: function(delta) 
	{ 
		/* we want to check if the user is scrolling up or down */ 
		if(delta >= 1) 
		{ 
			/* scrolling up */ 
			this.selectPreviousOption(); 
			
		} 
		else if(delta <= -1) 
		{ 
			/* scrolling down */ 
			this.selectNextOption(); 
		}
	},
	
	removeMouseWheel: function() 
	{ 
		base.off('mousewheel', document, this.mouseBind); 
	},
	
	addKeyboardSupport: function() 
	{ 
		base.on('keydown', document, this.keyBind); 
	},
	
	keyPress: function(e) 
	{ 
		var keyCode = e.keyCode; 
		if(keyCode == '38') 
		{ 
			/* scrolling up */ 
			this.selectPreviousOption(); 
		} 
		else if(keyCode == '37') 
		{ 
			/* scrolling up */ 
			this.selectPreviousOption(); 
		}
		else if(keyCode == '40') 
		{ 
			/* scrolling down */ 
			this.selectNextOption(); 
		} 
		else if(keyCode == '39') 
		{ 
			/* scrolling down */ 
			this.selectNextOption(); 
		}
	},
	
	removeKeyPress: function() 
	{ 
		base.off('keydown', document, this.keyBind); 
	},
	
	remove: function()
	{ 
		this.reset(); 
		
		this.removeMouseWheel(); 
		this.removeKeyPress(); 
		this.removeResizeEvent(); 
		this.removeScroll(); 
	},
	
	addResizeEvent: function() 
	{ 
		base.on('resize', window, this.resizeBind); 
	},
	
	removeResizeEvent: function() 
	{ 
		base.off('resize', window, this.resizeBind); 
	},
	
	getScrollMode: function() 
	{ 
		var size = base.getWindowSize(); 
		if(size.width <= this.mobileSize) 
		{ 
			/* we need to check if the system needs to 
			reset the desktop settings */ 
			if(this.scrollMode !== 'mobile') 
			{ 
				this.setScrollMode('mobile');  
			} 
		} 
		else 
		{ 
			/* we need to check if the system needs to 
			reset the desktop settings */ 
			if(this.scrollMode !== 'desktop') 
			{ 
				this.setScrollMode('desktop');   
			} 
		} 
		
		return this.scrollMode; 
	},
	
	/* this will check to enable mobile or pc mode */ 
	setScrollModeBySize: function() 
	{ 
		var size = base.getWindowSize(); 
		var last = this.lastSelectedOption; 
		
		/* we want to change the settings if the window size is 
		less or equal to mobile size */ 
		if(size.width <= this.mobileSize) 
		{ 
			this.showAllPanels(); 
			
			/* we needto check if the system needs to 
			reset the desktop settings */ 
			if(this.scrollMode !== 'mobile') 
			{ 
				/* update scroll mode to mobile */ 
				this.setScrollMode('mobile');  
				var result = this.touch.remove();
				
				/* we want to reselect the last selected option */ 
				if(last) 
				{ 
					this.selectOption(last); 
				} 
				else 
				{ 
					this.selectOptionByNumber(0); 
				}
			} 
		} 
		else 
		{ 
			/* we needto check if the system needs to 
			reset the desktop settings */ 
			if(this.scrollMode !== 'desktop') 
			{ 
				/* update scroll mode to desktop */ 
				this.setScrollMode('desktop');  
				var result = this.touch.add(); 
				
				if(last) 
				{ 
					this.selectOptionByNumber(last.optionNumber); 
				} 
				else 
				{ 
					this.selectOptionByNumber(0); 
				} 
			} 
		} 
	},
	
	setScrollMode: function(mode) 
	{ 
		this.scrollMode = mode; 
	},
	
	/* this will get all panels inside the container 
	that has the scene class name */
	getContainerScenePanels: function() 
	{ 
		var scenePanels = [], 
		className = this.sceneClassName; 
		
		if(this.container) 
		{ 
			var container = document.getElementById(this.container); 
			if(container.hasChildNodes()) 
			{ 
				var number = container.childNodes.length; 
				for(var i = 0; i < number; i++) 
				{ 
					var child = container.childNodes[i]; 
					if(child.className) 
					{ 
						/* add any container that has our class name */ 
						if(child.className.indexOf(className) >= 0) 
						{ 
							scenePanels.push(child); 
						} 
					}
				} 
			} 
		} 
		
		return scenePanels; 
	},
				
	setupOptions: function() 
	{ 
		var tmpOptions = this.getContainerScenePanels();  
		if(tmpOptions) 
		{ 
			this.reset(); 
			
			var length = tmpOptions.length; 
			if(length > 0) 
			{  
				var tmpNumber = 0; 
				/* create the option array and setup the options */ 
				for(var i = 0; i < length; i++) 
				{ 
					var panel = tmpOptions[i]; 
					this.addOption(panel);      
				}  
				
				/* we want to select the first option */ 
				this.selectOptionByNumber(0);
			}     
		} 
	},
	
	setupBreadCrumbContainer: function() 
	{ 
		var numberContainer = this.create('div', {
			id: this.id + '_crumb_container', 
			className: 'crumb-container'
		}, this.container);
	},
	
	createCrumb: function(tmpOption) 
	{ 
		var crumbContainer = this.id + '_crumb_container'; 
		var optionClass = this.getCrumbClass(tmpOption);  
		
		var self = this; 
		var option = this.create('div', {
			id: tmpOption.crumbId, 
			className: optionClass, 
			click: function(){self.selectOption(tmpOption);}
		}, crumbContainer); 
		
		option = document.getElementById(option); 
		
		base.data(option, 'data-id', tmpOption.label); 
	},
	
	getCrumbClass: function(tmpOption) 
	{ 
		return (tmpOption.selected === 'yes')? 'option selected' : 'option';  
	},
	
	updateCrumbStyles: function() 
	{ 
		var options = this.optionsArray, 
		length = options.length;
		for(var i = 0; i < length; i++) 
		{ 
			var option = options[i]; 
			if(typeof option.crumbId !== 'undefined') 
			{ 
				/* we want to get the crumb class name */ 
				var crumbClass = this.getCrumbClass(option); 
				document.getElementById(option.crumbId).className = crumbClass; 
			}
		} 
	},
	
	setupConversionTracking: function(conversionID, conversionLabels) 
	{ 
		if(typeof conversionLabels !== 'undefined') 
		{ 
			var length = conversionLabels.length; 
			for(var i = 0; i < length; i++) 
			{ 
				var tmpLabel = conversionLabels[i]; 
				tmpLabel.id = conversionID; 
				tmpLabel.viewed = 'no'; 
				
				this.addConversionLabel(tmpLabel); 
			} 
		} 
	},
	
	addConversionLabel: function(tmpLabel) 
	{ 
		this.conversionLabels.push(tmpLabel); 
	},
	
	checkConversionNumber: function(number) 
	{ 
		var conversions = this.conversionLabels, 
		length = conversions.length; 
		if(length >= 1) 
		{ 
			var conversion = null; 
			for(var i = 0; i < length; i++) 
			{ 
				var tmpLabel = conversions[i]; 
				if(tmpLabel.number == number) 
				{ 
					conversion = tmpLabel; 
					break; 
				} 
			} 
			
			if(conversion) 
			{ 
				if(conversion.viewed === 'no') 
				{ 
					conversion.viewed = 'yes'; 
					this.trackConversion(conversion.id, conversion.label); 
				} 
			} 
		} 
	},
	
	trackConversion: function(google_conversion_id, google_conversion_label) 
	{ 
		var image = new Image(1,1); 
        image.src = "//www.googleadservices.com/pagead/conversion/" + google_conversion_id + "/?label=" + google_conversion_label + ""; 
	},
	
	/* this will add abutton to show users to scroll */ 
	setupScrollPointer: function() 
	{ 
		var button = this.create('div', {
			id: this.id + '_scroll_pointer', 
			className: 'scroll_pointer_button', 
			click: base.bind(this, this.selectNextOption)
		}, this.container); 
		
		var pointer = this.create('div', {
			className: 'scroll_pointer'
		}, button);
	},
	
	/* this will select the panel */ 
	selectPanel: function(tmpOption) 
	{ 
		/* we needto check if we are a desktop or mobile */ 
		if(this.scrollMode == '' || this.scrollMode === 'desktop') 
		{ 
			this.showSelectedPanel(tmpOption); 
		} 
		else if(this.scrollMode === 'mobile') 
		{ 
			this.scrollToSelectedPanel(tmpOption); 
		}
	},
	
	/* this will get the panel animation class for the 
	panel being selected and the panel being removed */ 
	getPanelClass: function(lastNum, currentNum) 
	{ 
		var animation = { 
			selecting: '', 
			removing: '' 
		}; 
		
		if(currentNum > lastNum) 
		{ 
			animation.removing = 'pullUp'; 
			animation.selecting = 'pullDownIn';
		} 
		else if(currentNum < lastNum) 
		{ 
			animation.removing = 'pullDown'; 
			animation.selecting = 'pullUpIn';
		}  
		
		return animation; 
	},
	
	/* this will bring in the selected option and 
	remove the previous option. 
	@param (object) tmpOption = the selected option */ 
	showSelectedPanel: function(tmpOption) 
	{ 
		/* we needto get the panel number to get the 
		selecting animation class */ 
		var panelNumber = base.inArray(this.optionsArray, tmpOption), 
		lastOption = this.lastSelectedOption, 
		lastPanelNumber = (typeof lastOption !== 'undefined')? base.inArray(this.optionsArray, lastOption): 0; 
		var animations = this.getPanelClass(lastPanelNumber, panelNumber); 
		
		var options = this.optionsArray, 
		length = options.length;
		
		/* we need to get the selected panel and remove 
		any previously selected panels */ 
		for(var i = 0; i < length; i++) 
		{ 
			var panelId = options[i].panelId; 
			panel = document.getElementById(panelId); 
			
			/* we need to check if the panel is the selected panel */ 
			if(tmpOption.panelId === panelId) 
			{ 
				panel.style.display = 'block';
				panel.style.zIndex = '5';  
				
				base.removeClass(panel, 'animate');
				panel.offsetWidth = panel.offsetWidth; 
				base.addClass(panel, 'animate'); 
				
				var animationClass = animations.selecting; 
				
				/* we only want to add the animation if we have animated 
				the last panel perviously. this will make the first panel 
				load in without sliding in. */ 
				if(lastOption && animationClass != '') 
				{ 
					base.animate._in(panel,animationClass,800); 
				}
			} 
			else 
			{ 
				panel.style.position = 'absolute'; 
				panel.style.zIndex = '2'; 
				panel.style.top = '0px'; 
				
				if(i == lastPanelNumber) 
				{  
					var animationClass = animations.removing; 
					if(animationClass != '') 
					{ 
						base.animate.out(panel,animationClass,1000); 
					}
				} 
				else 
				{ 
					panel.style.display = 'none'; 
				} 
			} 
		} 
		
		this.updateCrumbStyles(); 
	},
	
	/* this will scroll to the selected option */ 
	scrollToSelectedPanel: function(tmpOption) 
	{ 
		this.showAllPanels(); 
		
		var panel = document.getElementById(tmpOption.panelId); 
		var position = base.getPosition(panel); 
		
		window.scrollTo(0, position.y); 
		
		this.updateCrumbStyles(); 
	},  
	
	/* this will track scrolling */ 
	addScroll: function() 
	{ 
		base.on('scroll', window, this.scrollBind);  
	}, 
	
	removeScroll: function() 
	{ 
		base.off('scroll', window, this.scrollBind);  
	}, 
	
	/* this will check to change the header class as 
	the page is scrolled and check to select panels 
	by scroll */ 
	checkScroll: function()
	{ 
		var logo = document.querySelector('.main_logo_top'); 
		var landingHeader = document.getElementById('header_container');  
		var scrollTop = base.getScrollTop(); 
		
		var collapseClass = 'header_collapse';   
		
		/* we want to check if the page has been scrolled */
		if(typeof landingHeader !== 'undefined') 
		{ 
			if(scrollTop > 0 && 'page_main_header ' + collapseClass) 
			{ 
				landingHeader.className = 'page_main_header ' + collapseClass; 
			} 
			else 
			{ 
				landingHeader.className = 'page_main_header'; 
			} 
		} 
		
		var options = this.optionsArray, 
		length = options.length;
		/* this will select the panel as the user 
		scrolls over it */ 
		for(var i = 0; i < length; i++) 
		{ 
			var tmpOption = options[i], 
			panelId = tmpOption.panelId, 
			panel = document.getElementById(panelId); 
			
			var position = base.getPosition(panel), 
			size = base.getSize(panel), 
			bottom = position.y + size.height; 
			
			if(scrollTop >= position.y && scrollTop < bottom) 
			{ 
				if(tmpOption.selected !== 'yes') 
				{  
					this.selectOption(tmpOption, true);  
				} 
			} 
			
		}
	},
	
	/* this will show all scenes */ 
	showAllPanels: function() 
	{ 
		var options = this.optionsArray, 
		length = options.length; 
		/* we need to get the selected panel and remove 
		any previously selected panels */ 
		for(var i = 0; i < length; i++) 
		{ 
			var panelId = options[i].panelId, 
			panel = document.getElementById(panelId); 
			
			panel.style.position = 'relative'; 
			panel.style.zIndex = '5';
			
			/* we dont want to select the panel if its already blocked */ 
			if(panel.style.display !== 'block') 
			{ 
				panel.style.display = 'block';  
			}
		} 
	},   
	
	setup: function() 
	{   
		this.setupBinds(); 
		this.setupBreadCrumbContainer(); 
		this.setupScrollPointer(); 
		this.getScrollMode();  
		this.setupOptions();  
		
		this.addMouseWheelSupport();     
		this.addKeyboardSupport(); 
		
		this.addScroll(); 
		
		/* we need to setup the scroll mode to add the 
		behaviors by the screen
		size */ 
		this.setScrollModeBySize(); 
		this.addResizeEvent(); 
	},  
	
	reset: function() 
	{ 
		this.optionsArray = [];    
	},
	
	/* this adds a new option to the list panel */ 
	addOption: function(panel) 
	{ 
		var number = this.optionsArray.length; 
		
		var option = { 
			optionNumber: number, 
			nameId: this.id + '_option_number_' + number, 
			crumbId: this.id + '_crumb_number_' + number,
			panelId: panel.id, 
			label: panel.getAttribute('data-id'), 
			selected: 'no'
		}; 
		
		this.optionsArray.push(option);  
		this.createCrumb(option);
	},  
	
	/* this will get the selected option */ 
	selectLastOption: function() 
	{ 
		if(this.optionsArray) 
		{ 
			var lastOptionNumber = (this.optionsArray.length - 1);  
			this.selectOptionByNumber(lastOptionNumber); 
			return true; 
		}
		
		return false; 
	},
	
	/* this will get the selected option */ 
	getSelectedOption: function() 
	{ 
		var options = this.optionsArray, 
		length = options.length;
		for(var j = 0; j < length; j++) 
		{ 
			var option = options[j]; 
			if(option.selected === 'yes') 
			{ 
				return option;  
			} 
		} 
		
		return false; 
	},
	
	/* the enables click events to be added in a for loop */ 
	createClickHandler: function(option)
	{ 
		var self = this; 
		
		return function() 
		{ 
			self.selectOption(option) 
		}; 
	},
	
	/* this will allow the option to be selected by number */ 
	selectOptionByNumber: function(number) 
	{ 
		var selection, 
		options = this.optionsArray, 
		length = options.length; 
		
		for(var i = 0; i < length; i++) 
		{ 
			if(i == number) 
			{ 
				selection = options[i];  
			}  
		}  
	
		if(selection) 
		{ 
			this.selectOption(selection); 
		} 
	},  
	
	/* this will select the option and unselect the 
	last selected option. 
	@param (object) tmpOPtion = the option to select */  
	selectOption: function(tmpOption, scrollUpdate)
	{ 
		var object = document.getElementById(tmpOption.panelId);  
		tmpOption.selected = 'yes';
		
		/* we want to check to change header class */ 
		this.updateHeaderClass(tmpOption.optionNumber); 
		this.checkToAddScrollPointer(tmpOption.optionNumber); 
		this.checkConversionNumber(tmpOption.optionNumber); 
		
		base.addClass(object, 'active'); 
		this.unselectOption(tmpOption);
		
		/* if the page is scrolling we dont want to 
		affect the scroll */ 
		if(!scrollUpdate) 
		{ 
			this.selectPanel(tmpOption);  
		} 
		else 
		{ 
			this.updateCrumbStyles(); 
		}
		
		this.setLastSelectedOption(tmpOption); 
	},  
	
	/* this will check to change the header class to a 
	class desired by the panel number */ 
	updateHeaderClass: function(numberSelected) 
	{ 
		var header = document.getElementById(this.header), 
		className = ''; 
		
		if(header)
		{ 
			if(numberSelected == '0') 
			{ 
				className = 'page_main_header'; 
			} 
			else if(numberSelected == (this.optionsArray.length - 1)) 
			{ 
				className = 'page_main_header header_collapse header_hidden'; 
			}
			else
			{ 
				className = 'page_main_header header_collapse'; 
			} 

			header.className = className;
		}
	},
	
	/* this will add the pointer on the first screen only */ 
	checkToAddScrollPointer: function(numberSelected) 
	{ 
		var pointer = document.getElementById(this.id + '_scroll_pointer'); 
		pointer.style.display = (numberSelected == '0')? 'block' : 'none';  
	},
		
	/* we can use the get and select 
	next options to move in reverse 
	through the list */
	getNextOption: function(lastOptionNumber) 
	{ 
		if(lastOptionNumber !== null) 
		{ 
			var nextOptionNumber = ++lastOptionNumber;  
			if(nextOptionNumber < this.optionsArray.length) 
			{ 
				return this.optionsArray[nextOptionNumber]; 
			}  
		} 
	},
	
	selectNextOption: function() 
	{ 
		var option = this.lastSelectedOption;
		if(option) 
		{ 
			var nextOption = this.getNextOption(option.optionNumber); 
			if(nextOption) 
			{ 
				this.selectOption(nextOption); 
			} 
		} 
	},
	
	/* we can use the get and select 
	previous options to move in reverse 
	through the list */ 
	getPreviousOption: function(lastOptionNumber) 
	{ 
		if(lastOptionNumber !== null) 
		{ 
			var previousOptionNumber = --lastOptionNumber;  
			if(previousOptionNumber >= 0) 
			{ 
				return this.optionsArray[previousOptionNumber]; 
			}  
		} 
	},
	
	selectPreviousOption: function() 
	{ 
		var option = this.lastSelectedOption; 
		if(option) 
		{ 
			var previousOption = this.getPreviousOption(option.optionNumber); 
			if(previousOption) 
			{ 
				this.selectOption(previousOption); 
			} 
		} 
	},
	
	/* this will save the last selected option */ 
	setLastSelectedOption: function(option) 
	{ 
		this.lastSelectedOption = option; 
	},
	
	/* this will unselect all options except the last selected option */ 
	unselectOption: function(tmpOption) 
	{ 
		var options = this.optionsArray, 
		length = options.length; 
		for(var j = 0; j < length; j++) 
		{ 
			var option = options[j]; 
			if(option !== tmpOption) 
			{ 
				if(option.selected === 'yes') 
				{ 
					option.selected = 'no'; 
					
					var object = document.getElementById(option.panelId); 
					base.removeClass(object, 'active');
				} 
			} 
		} 
	},     
	
	/* this will update the list for the selected desks and option */ 
	update: function() 
	{  
		 
	},   
	
	stopClickEvents: function(e) 
	{ 
		if(!e) 
		{ 
			e = window.event;
		} 
	
		//IE9 & Other Browsers
		if(e.stopPropagation) 
		{
			e.stopPropagation();
		}
		//IE8 and Lower
		else 
		{
			e.cancelBubble = true;
		} 
	} 
}); 