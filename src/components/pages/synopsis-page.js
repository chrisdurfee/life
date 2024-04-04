import { Article, Div, H1, H2, P } from "@base-framework/atoms";
import { State } from "@base-framework/base";
import { MainSection } from "../atoms/atoms.js";
import { Page } from "./page.js";

/**
 * SynopsisPage
 *
 * This will create the synopsis page.
 *
 * @class
 */
export class SynopsisPage extends Page
{
	/**
	 * This will set the header to dark before rendering.
	 */
	beforeSetup()
	{
		State.set('header', 'dark', true);
	}

	/**
	 * This will render the synopsis panel.
	 *
	 * @returns {object}
	 */
	render()
	{
		return MainSection({ class: 'synopsis-panel' }, [
			Div({ class: 'col col-image' }),
			Div({ class: 'col col-content' }, [
				Article({ class: 'text-container' }, [
					H1('grabs you and doesn\'t let go'),
					H2('Synopsis'),
					P({ class: 'synopsis-paragraph' }, 'Life is a terrifying sci-fi thriller about a team of scientists aboard the International Space Station whose mission of discovery turns to one of primal fear when they find a rapidly evolving life form that caused extinction on Mars, and now threatens the crew and all life on Earth.')
				])
			])
		]);
	}

	/**
	 * This will set the header to light before destroying.
	 */
	beforeDestroy()
	{
		State.set('header', 'dark', false);
	}
}