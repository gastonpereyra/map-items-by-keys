'use strict';

const assert = require('assert');

const mapItemsBy = require('../lib');

describe('Map Items By Keys', () => {

	context('When Parameters are invalid', () => {

		it('Should throw Error if key is missing', () => {
			assert.throws(() => mapItemsBy());
		});

		it('Should throw Error if keys is empty array', () => {
			assert.throws(() => mapItemsBy([]));
		});

		it('Should throw Error if items is missing', () => {
			assert.throws(() => mapItemsBy('id'));
		});

		it('Should throw Error if items is empty array', () => {
			assert.throws(() => mapItemsBy('id', []));
		});
	});

	context('When must map with a single and unique Key ', () => {

		it('Should return the object mapped', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '2', name: 'Tony Stark' }
			];

			const itemsMapped = {
				[items[0].id]: items[0],
				[items[1].id]: items[1]
			};

			assert.deepStrictEqual(mapItemsBy('id', items), itemsMapped);
		});

		it('Should return the object mapped but with a single key if it is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '1', name: 'Tony Stark' }
			];

			const itemsMapped = {
				[items[0].id]: items[1]
			};

			assert.deepStrictEqual(mapItemsBy('id', items), itemsMapped);
		});

		it('Should return the object mapped and ignored items without key', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '2', name: 'Tony Stark' },
				{ name: 'Luffy' }
			];

			const itemsMapped = {
				[items[0].id]: items[0],
				[items[1].id]: items[1]
			};

			assert.deepStrictEqual(mapItemsBy('id', items), itemsMapped);
		});
	});

	context('When must map with a single and multiple Key', () => {

		it('Should return the object mapped with keys not repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '2', name: 'Tony Stark' }
			];

			const itemsMapped = {
				[items[0].id]: [items[0]],
				[items[1].id]: [items[1]]
			};

			assert.deepStrictEqual(mapItemsBy('id', items, false), itemsMapped);
		});

		it('Should return the object mapped with keys repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '1', name: 'Tony Stark' }
			];

			const itemsMapped = {
				[items[0].id]: items
			};

			assert.deepStrictEqual(mapItemsBy('id', items, false), itemsMapped);
		});

		it('Should return the object mapped with keys not repeated and ignored items without key', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '2', name: 'Tony Stark' },
				{ name: 'Luffy' }
			];

			const itemsMapped = {
				[items[0].id]: [items[0]],
				[items[1].id]: [items[1]]
			};

			assert.deepStrictEqual(mapItemsBy('id', items, false), itemsMapped);
		});
	});

	context('When must map with a mutiple and unique Keys', () => {

		it('Should return the object mapped', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ id: '2', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: items[0]
				},
				[items[1].id]: {
					[items[1].name]: items[1]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items), itemsMapped);
		});

		it('Should return the object mapped if some-outer key is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: items[0],
					[items[1].name]: items[1]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items), itemsMapped);
		});

		it('Should return the object mapped if final key is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Ironman' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[1].hero]: items[1]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'hero'], items), itemsMapped);
		});

		it('Should return the object mapped if some-outer key is missing', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: items[0]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items), itemsMapped);
		});

		it('Should return the object mapped if final key is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[1].hero]: items[1]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'hero'], items), itemsMapped);
		});
	});

	context('When must map with a mutiple and multiple Keys', () => {

		it('Should return the object mapped', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ id: '2', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: [items[0]]
				},
				[items[1].id]: {
					[items[1].name]: [items[1]]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items, false), itemsMapped);
		});

		it('Should return the object mapped if some-outer key is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: [items[0]],
					[items[1].name]: [items[1]]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items, false), itemsMapped);
		});

		it('Should return the object mapped if final key is repeated', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Ironman' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[1].hero]: items
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'hero'], items, false), itemsMapped);
		});

		it('Should return the object mapped if some-outer key is missing', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne', hero: 'Batman' },
				{ name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[0].id]: {
					[items[0].name]: [items[0]]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'name'], items, false), itemsMapped);
		});

		it('Should return the object mapped if final key is missing', () => {

			const items = [
				{ id: '1', name: 'Bruce Wayne' },
				{ id: '1', name: 'Tony Stark', hero: 'Ironman' }
			];

			const itemsMapped = {
				[items[1].id]: {
					[items[1].hero]: [items[1]]
				}
			};

			assert.deepStrictEqual(mapItemsBy(['id', 'hero'], items, false), itemsMapped);
		});
	});
});
