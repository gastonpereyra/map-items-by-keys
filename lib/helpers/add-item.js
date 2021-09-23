'use strict';

const addItem = ([key, ...keys], baseItem, item, isUnique) => {

	if(!baseItem[item[key]] && !keys.length && !isUnique)
		baseItem[item[key]] = [];

	else if(!baseItem[item[key]])
		baseItem[item[key]] = {};

	if(!keys.length && !isUnique)
		baseItem[item[key]].push(item);

	else if(!keys.length && isUnique)
		baseItem[item[key]] = item;

	if(keys.length)
		return addItem(keys, baseItem[item[key]], item, isUnique);
};

module.exports = addItem;
