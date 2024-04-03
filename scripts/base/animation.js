/* base framework module */ 
/* 
	css animation add and remove with full object 
	animation tracking 
*/ 
(function() 
{
	"use strict"; 
	
	/* this is a helper fuction to remove a class and hide 
	an element. 
	@param (object) obj = the element to hide 
	@param (string) animationClass = the css class name */ 
	var removeClassAndHide = function(obj, animationClass, callBack)
	{  
		obj.style.display = 'none'; 
		removeAnimationClass(obj, animationClass, callBack); 
	}; 
	
	/* this is a helper fuction to remove an animation 
	class after it has been animated.  
	@param (object) obj = the element object 
	@param (string) animationClass = the css class name */
	var removeAnimationClass = function(obj, animationClass, callBack)
	{ 
		if(typeof callBack === 'function') 
		{ 
			callBack.call(); 
		}
		
		base.removeClass(obj, animationClass); 
		base.animate.animating.remove(obj);   
	};
	
	var getElement = function(element) 
	{ 
		return (typeof element === 'string')? document.getElementById(element) : element;
	}; 
	
	/* this will add and remove css animations */ 
	base.extend.animate = 
	{ 
		/* this class tracks all objects being animated and can 
		add and remove them when completed */  
		animating: 
		{ 
			objects: [],  
			
			add: function(object, className, timer) 
			{ 
				this.stopPreviousAnimations(object); 
				this.addObject(object, className, timer);  
			}, 
			
			addObject: function(object, className, timer) 
			{ 
				if(!object) 
				{ 
					return false; 
				}
					 
				this.objects.push({ 
					object: object, 
					className: className, 
					timer: timer 
				}); 
			}, 
			
			remove: function(object) 
			{ 
				this.removeObject(object);  
			}, 
			
			removeObject: function(object, removeClass) 
			{ 
				if(!object) 
				{ 
					return false; 
				}
					  
				var animations = this.checkAnimating(object); 
				if(animations === false) 
				{ 
					return false; 
				}

				var animation, indexNumber; 
				var objects = this.objects;
				for(var i = 0, maxLength = animations.length; i < maxLength; i++) 
				{ 
					animation = animations[i]; 
					/* we want to stop the timer */ 
					this.stopTimer(animation); 

					if(removeClass) 
					{ 
						/* we want to remove the className */ 
						base.removeClass(animation.object, animation.className); 
					}

					/* we want to remove the animation fron the object array */ 
					//var indexNumber = this.objects.indexOf(animation); 
					indexNumber = base.inArray(objects, animation);
					if(indexNumber > -1) 
					{ 
						objects.splice(indexNumber, 1); 
					}
				} 
			}, 
			
			stopTimer: function(animation) 
			{ 
				if(animation) 
				{ 
					var timer = animation.timer; 
					window.clearTimeout(timer); 
				}
			}, 
			
			checkAnimating: function(obj) 
			{ 
				var animation, 
				animationArray = []; 
				
				/* we want to get any timers set for our object */ 
				var objects = this.objects; 
				for(var i = 0, maxLength = objects.length; i < maxLength; i++) 
				{ 
					animation = objects[i]; 
					if(animation.object === obj) 
					{ 
						animationArray.push(animation); 
					} 
				} 
				
				return (animationArray.length > 0)? animationArray : false;  
			}, 
			
			stopPreviousAnimations: function(obj) 
			{ 
				/* we want to remove the timers and class names 
				from the object */ 
				this.removeObject(obj, 1);   
			}, 
			
			reset: function() 
			{ 
				this.objects = [];   
			}
		}, 
		
		createAnimation: function(obj, animationClass, duration, callBack, endCallBack)
		{ 
			var animationCallBack = base.createCallBack(null, callBack, [obj, animationClass, endCallBack]);
			
			var timer = window.setTimeout(animationCallBack, duration); 
			this.animating.add(obj, animationClass, timer);
		}, 
		
		/* this will perform an animation on the object and 
		then turn the object to display none after the 
		duration */  
		out: function(object, animationClass, duration, endCallBack)
		{ 
			var obj = getElement(object); 
			base.addClass(obj, animationClass);     
			
			this.createAnimation(obj, animationClass, duration, removeClassAndHide, endCallBack); 
		}, 
		
		/* this will dsiplay the object then perform an animation 
		on the object and remove the class after the duration */ 
		_in: function(object, animationClass, duration, endCallBack)
		{ 
			var obj = getElement(object); 
			base.addClass(obj, animationClass); 
			obj.style.display = 'block'; 
			
			this.createAnimation(obj, animationClass, duration, removeAnimationClass, endCallBack);
		},  
		
		/* this will add an animation class on the object then 
		it will remove the class when the duration is done */ 
		set: function(object, animationClass, duration, endCallBack)
		{ 
			var obj = getElement(object); 
			base.addClass(obj, animationClass);   
			
			this.createAnimation(obj, animationClass, duration, removeAnimationClass, endCallBack);
		} 
	}; 
})();