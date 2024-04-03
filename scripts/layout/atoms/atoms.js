"use strict"; 

var Tag = Atom.extend(function(props)
{
	return { 
		className: props.className || null,
		onState: props.onState || null,
		onSet: props.onSet || null,
		bind: props.bind || null,
		innerHTML: props.innerHTML || null,
		text: props.text || null,
		children: props.children
	};
});

var Video = Tag.extend(function(props)
{
	return { 
		tag: 'video',
		innerHTML: '<source src="' + props.src + '"></source>',
		autoplay: true,
		muted: true,
		loop: true
	};
}); 

var Button = Tag.extend(function(props)
{
	return { 
		tag: 'button',
		className: props.className || 'bttn',
		click: props.click || null
	};
});

var MainSection = Tag.extend(function(props)
{
	return { 
		tag: 'section',
		className: 'main-panel ' + (props.className || ''),
	};
});

var Header = Tag.extend(function(props)
{
	return { 
		tag: 'header',
		className: 'header-panel ' + (props.className || '')
	};
});

var H1 = Tag.extend(
{ 
	tag: 'h1'
});

var H2 = Tag.extend(
{ 
	tag: 'h2'
}); 

var Span = function(prop)
{
	return {
		tag: 'span', 
		bind: prop
	};
};

var Br = function()
{
	return {
		tag: 'br'
	};
};

var P = Tag.extend(
{ 
	tag: 'p'
});

var A = Tag.extend(function(props)
{
	return { 
		tag: 'a', 
		href: props.href || null, 
		watch: props.watch || null
	};
});