import { A, Div, Header, Img } from "@base-framework/atoms";
import { Component } from "@base-framework/base";
import { Navigation } from "../organisms/navigation.js";
import { Links } from './links.js';

/**
 * This will create the logo.
 *
 * @returns {object}
 */
const Logo = () => A({ class: 'logo', href: '/life/'}, [
	Img({
		src: 'images/life-logo.svg'
	})
]);

/**
 * HeaderPanel
 *
 * This will create the header panel.
 *
 * @class
 */
export class HeaderPanel extends Component
{
	render()
	{
		return Header({ onState: ['dark', { inner: true }]}, [
			Div({ class: 'logo-container' }, [
				Logo()
			]),
			Div({ class: 'nav-container' }, [
				Navigation(
				{
					cache: 'nav',
					options: Links()
				})
			])
		]);
	}

	setupStates()
	{
		this.stateTargetId = 'header';

		return {
			dark: false
		};
	}
}