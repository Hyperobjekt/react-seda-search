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
    placeholder: 'Search seda data...'
  }}
/>
```

### Props

The following props can be passed to the search component:

  - **algoliaId** `string` *required* URL to the endpoint with CSV data
  - **algoliaKey**: `string` variable name to use for x axis
  - **indicies**: `string` variable name to use for y axis
  - **inputProps**: `string` variable name to use for z axis (circle size)
  - **onSuggestionSelected**: `func` prefix for fetching files (corresponds to region)


[build-badge]: https://img.shields.io/travis/Hyperobjekt/react-seda-search/master.png?style=flat-square
[build]: https://travis-ci.org/Hyperobjekt/react-seda-search

[npm-badge]: https://img.shields.io/npm/v/react-seda-search.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-seda-search

