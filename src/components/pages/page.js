import { Main } from '@base-framework/atoms';
import { Component } from '@base-framework/base';

/**
 * Page
 *
 * This will create a base page.
 *
 * @class
 */
export class Page extends Component
{
	render()
	{
		return Main(this.class, this.children);
	}

	/**
	 * This will be called every time the route
	 * is activated.
	 *
	 * @param {object} params
	 */
	update(params)
	{

	}
}