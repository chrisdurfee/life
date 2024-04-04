import { AutoScroller } from '../organisms/auto-scroller.js';
import { Page } from "./page.js";

/**
 * ScrollPage
 *
 * This will create a scroll page.
 *
 * @class
 * @extends Page
 */
export class ScrollPage extends Page
{
	setupAutoScroller()
	{
		const autoScroller = this.autoScroller = new AutoScroller('', this.getId());
		autoScroller.setup();
	}

	afterSetup()
	{
		this.setupAutoScroller();
	}

	beforeDestroy()
	{
		this.autoScroller.remove();
	}
}