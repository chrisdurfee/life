import { MainModel } from './main-model.js';

/**
 * CastModel
 *
 * This will create the cast model.
 *
 * @type {typeof MainModel} UserData
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