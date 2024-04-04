import { CastPage } from '../pages/cast-page.js';
import { HomePage } from '../pages/home/home-page.js';
import { SynopsisPage } from '../pages/synopsis/synopsis-page.js';

/**
 * This will create a route object.
 *
 * @param {string} uri
 * @param {function} component
 * @param {string} [title]
 * @return {object}
 */
const Route = (uri, component, title) =>
{
	return {
		uri,
		component,
		title
	};
};

/**
 * This will get the routes.
 *
 * @return {array}
 */
export const Routes = () => [
	Route('/', HomePage(), 'EXPLORE'),
	Route('/synopsis/:id?', SynopsisPage(), 'SYNOPSIS'),
	Route('/cast/:id?', CastPage(), 'CAST'),
	Route('/gallery/:id?', CastPage(), 'GALLERY'),
];