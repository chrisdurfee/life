import { MainModel } from './main-model.js';

/**
 * CastModel
 *
 * This will create the cast model.
 *
 * @class
 * @extends MainModel
 */
export const CastModel = MainModel.extend(
{
	defaults:
	{
		lastName: '',
		firstName: '',
		text: '',
		class: ''
	}
});