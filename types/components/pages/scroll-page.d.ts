/**
 * ScrollPage
 *
 * This will create a scroll page.
 *
 * @class
 * @extends Page
 */
export class ScrollPage extends Page {
    /**
     * This will set up the auto scroller.
     *
     * @returns {void}
     */
    setupAutoScroller(): void;
    autoScroller: AutoScroller;
}
import { Page } from "./page.js";
import { AutoScroller } from '../organisms/auto-scroller.js';
