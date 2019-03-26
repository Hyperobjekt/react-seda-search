import React, {Component} from 'react'
import {render} from 'react-dom'

import SedaSearch from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-seda-search demo</h1>
      <SedaSearch
        algoliaId=''
        algoliaKey=''
        onSuggestionSelected={console.log}
        indices={['seda_all']}
        inputProps={{
          placeholder: 'Search seda data...'
        }}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
