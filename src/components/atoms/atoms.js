import { A, Br, Button, H1, H2, Header, P, Span } from '@base-framework/atoms';
import { Atom } from '@base-framework/base';
export { A, Br, Button, H1, H2, Header, P, Span };

export const Video = Atom((props) =>
{
	return {
		tag: 'video',
		class: props.class,
		html: '<source src="' + props.src + '"></source>',
		autoplay: true,
		muted: true,
		loop: true
	};
});

export const MainSection = Atom((props, children) =>
{
	return {
		tag: 'section',
		...props,
		class: 'main-panel ' + (props.class || ''),
		children
	};
});