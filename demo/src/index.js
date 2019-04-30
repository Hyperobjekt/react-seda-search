import React, {Component} from 'react'
import {render} from 'react-dom'

import SedaSearch from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-seda-search demo</h1>
      <SedaSearch
        algoliaId='QPJ12WSVR4'
        algoliaKey='bae9e4604dbd263cc47c48bfb30dd5dc'
        onSuggestionSelected={console.log}
        indices={['cities', 'counties', 'districts', 'schools']}
        inputProps={{
          placeholder: 'Search seda data...'
        }}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
