# React SEDA Search Component

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

React component for searching schools, districts, counties, and cities

## Usage

Pass the Algolia configuration to the component, along with the indicies to search and an event handler to handle when an option is selected.

```js
<SedaSearch
  algoliaId='{ALGOLIA_ID}'
  algoliaKey='{ALGOLIA_KEY}'
  onSuggestionSelected={console.log}
  indices={['cities', 'counties', 'districts', 'schools']}
  inputProps={{
    placeholder: 'Search seda data..'
  }}
/>
```

### Props

The following props can be passed to the search component:

  - **algoliaId** `string` *required* ID for the algolia project
  - **algoliaKey**: `string` API key for Algolia
  - **indicies**: `array` list of indicies to search (cities, counties, districts, and/or schools)
  - **inputProps**: `object` properties to be passed to the input field
  - **onSuggestionSelected**: `func` function to handle selected search suggestion


[build-badge]: https://img.shields.io/travis/Hyperobjekt/react-seda-search/master.png?style=flat-square
[build]: https://travis-ci.org/Hyperobjekt/react-seda-search

[npm-badge]: https://img.shields.io/npm/v/react-seda-search.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-seda-search

