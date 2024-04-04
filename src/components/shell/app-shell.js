import { Header } from '@base-framework/atoms';
import { Atom, Component } from '@base-framework/base';
import { HeaderPanel } from './header-panel.js';
import { Routes } from './routes.js';

/**
 * This will create the app container.
 *
 * @param {object} props
 * @param {array} children
 * @return {object}
 */
const AppContainer = Atom((props, children) =>
{
	return {
		class: 'main-container',
		...props,
		children
	};
});

/**
 * This will create the active panel container.
 *
 * @param {object} props
 * @param {array} children
 * @return {object}
 */
const ActivePanelContainer = Atom((props, children) =>
{
	return {
		class: 'main-body-container',
		...props,
		children
	};
});

/**
 * AppShell
 *
 * This will create the app shell.
 *
 * @class
 * @extends Component
 */
export class AppShell extends Component
{
	/**
	 * This will render the app shell.
	 *
	 * @returns {object}
	 */
	render()
	{
		return AppContainer([
			Header({ class: 'header-container' }, [
				new HeaderPanel({ cache: 'header' })
			]),
			ActivePanelContainer({
				cache: 'mainBody',
				class: 'main-body-container',
				switch: Routes()
			})
		]);
	}

	getBodyPanel()
	{
		return this.mainBody;
	}
}