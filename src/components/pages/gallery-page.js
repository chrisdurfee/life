import { MainSection } from "../atoms/atoms.js";
import { ScrollPage } from "./scroll-page.js";

/**
 * This will create the gallery image.
 *
 * @param {object} props
 * @returns {object}
 */
const GalleryImage = (props) => ({
	id: props.id,
	class: 'cast-container ' + props.class,
	'data-id': props.dataId || null
});

/**
 * GalleryPanel
 *
 * This will create the gallery panel.
 *
 * @class
 */
export class GalleryPage extends ScrollPage
{
	render()
	{
		return MainSection({ class: 'gallery-panel' }, [
			this.add('first', 'first', 'Ryan Reynolds'),
			this.add('second', 'second'),
			this.add('third', 'third'),
			this.add('fourth', 'fourth'),
			this.add('fifth', 'fifth'),
			this.add('sixth', 'sixth'),
			this.add('seventh', 'seventh'),
			this.add('eighth', 'eighth'),
			this.add('ninth', 'ninth')
		]);
	}

	add(id, className, dataId)
	{
		return GalleryImage(
		{
			id: this.getId(id),
			class: className,
			'data-id': dataId
		});
	}
}