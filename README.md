# Map Items by Keys

## Code Quality Status
![Build Status](https://github.com/gastonpereyra/map-items-by-keys/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://img.shields.io/coveralls/github/gastonpereyra/map-items-by-keys/master.svg)](https://coveralls.io/r/gastonpereyra/map-items-by-keys?branch=master)

![Map-Items-By-Keys Banner](https://user-images.githubusercontent.com/39351850/94375239-ad9b9780-00e8-11eb-9e8a-dcedbf5418a7.png)

## Description
Create a dictonary-like object from a list of objects using an specfic value from each object.

## Installation

```
npm i map-items-by-keys
```

## mapItemsBy(keys, items, isUnique)

### Parameters

#### keys

The name of the fields to use as Keys. Can be a Single Key or Multiple ones.

- Type: _string_ or _Array of string_
- Example:
    - `'id'`
    - `['id', 'name']`

> :warning: If some item hasn't the field will be ignored
#### items

The list of items to be mapped.

- Type: _Array of objects_
- Example:

```json
[
    { "id": 1, "name": "Bruce Wayne", "hero": "Batman" },
    { "id": 2, "name": "Tony Stark", "hero": "Ironman" }
]
```

#### isUnique

This refers if the values of the keys are unique. This indicate if the final map will save as an array (`false`) or an object (`false`).

- Type: _Boolean_
- Default: `true`

### Examples

#### Single and Unique Key

```js
const mapItemsBy = require('map-items-by-keys');

const items = [
    { id: 1, name: "Bruce Wayne", hero: "Batman" },
    { id: 2, name: "Tony Stark", hero: "Ironman" }
]

const itemsMapped = mapItemsBy("id", items);

/*
output: 

{
    1: { id: 1, name: "Bruce Wayne", hero: "Batman" },
    2: { id: 2, name: "Tony Stark", hero: "Ironman" }
}
*/
```

#### Single and not-unique Key

```js
const mapItemsBy = require('map-items-by-keys');

const items = [
    { id: 1, name: "Bruce Wayne", hero: "Batman" },
    { id: 2, name: "Tony Stark", hero: "Ironman" },
    { id: 3, name: "Richard Grayson", hero: "Batman" }
]

const itemsMapped = mapItemsBy("hero", items, false);

/*
output: 

{
    Batman: [
        { id: 1, name: Bruce Wayne, hero: "Batman" },
        { id: 3, name: "Richard Grayson", hero: "Batman" }
    ],
    Ironman: [
        { id: 2, name: Tony Stark, hero: "Ironman" }
    ]
}
*/
```

#### Multiple and Unique Key

```js
const mapItemsBy = require('map-items-by-keys');

const items = [
    { id: 1, name: "Bruce Wayne", hero: "Batman", brand: "DC" },
    { id: 2, name: "Tony Stark", hero: "Ironman", brand: "Marvel" }
]

const itemsMapped = mapItemsBy(["brand", "id"], items);

/*
output: 

{
    DC: {
        1: { id: 1, name: "Bruce Wayne", hero: "Batman" }
    },
    Marvel: {
        2: { id: 2, name: "Tony Stark", hero: "Ironman" }
    }
}
*/
```

#### Multiple and not-unique Key

```js
const mapItemsBy = require('map-items-by-keys');

const items = [
    { id: 1, name: "Bruce Wayne", hero: "Batman", brand: "DC" },
    { id: 2, name: "Tony Stark", hero: "Ironman", brand: "Marvel" },
    { id: 3, name: "Richard Grayson", hero: "Batman", brand: "DC" }
]

const itemsMapped = mapItemsBy(["brand", "hero"], items, false);

/*
output: 

{
     DC: {
        Batman: [
            { id: 1, name: "Bruce Wayne", hero: "Batman" },
            { id: 3, name: "Richard Grayson", hero: "Batman", brand: "DC" }
        ]
    },
    Marvel: {
        Ironman: [
            { id: 2, name: "Tony Stark", hero: "Ironman" }
        ]
    }
}
*/
```
## Bug :bug:

[Report Here](https://github.com/gastonpereyra/map-items-by-keys/issues/new?assignees=gastonpereyra&labels=bug&template=bug.md&title=[BUG])

## Idea :bulb:

[Tell me](https://github.com/gastonpereyra/map-items-by-keys/issues/new?assignees=gastonpereyra&labels=enhancement&title=%5BIDEA%5D+-)
