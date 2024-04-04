import { Article, Button, Div, H1 } from '@base-framework/atoms';
import { MainSection, Video } from '../atoms/atoms.js';
import { Page } from './page.js';

/**
 * HomePage
 *
 * This will create the home page.
 *
 * @class
 */
export const HomePage = (props) => (
	new Page([
		MainSection({ class: 'home-panel' }, [
			Div({ class: 'video-container' }, [
				Video({
					class: 'video',
					src: 'videos/life-trailer-2.mp4#t=0.26,214"></source>'
				})
			]),
			Article({ class: 'headline-panel' }, [
				H1({
					innerHTML: 'Now Playing<br><span>In Theatres</span>',
					class: 'headline'
				}),
				Button('Watch Trailer')
			])
		])
	])
);