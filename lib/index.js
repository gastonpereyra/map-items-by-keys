'use strict';

const addItem = require('./helpers/add-item');

/**
 * Map Items by Key or Keys
 * @param {string|string[]} keys
 * @param {Object[]} items Items to Map
 * @param {boolean} isUnique If the Key in the Items must be Unique
 */
module.exports = (keys, items, isUnique = true) => {

	if(!keys || (Array.isArray(keys) && !keys.length))
		throw new Error('Key is missing');

	if(!items || !items.length)
		throw new Error('Items is missing');

	const keysToMap = !Array.isArray(keys) ? [keys] : keys;

	return items.reduce((itemsMapped, item) => {

		if(keysToMap.some(key => !item[key]))
			return itemsMapped;

		addItem(keysToMap, itemsMapped, item, isUnique);

		return itemsMapped;
	}, {});
};
