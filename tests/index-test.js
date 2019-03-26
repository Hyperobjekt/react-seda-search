import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Component from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('shows message on no indices', () => {
    render(<Component algoliaId='1234' algoliaKey='123456' />, node, () => {
      expect(node.innerHTML).toContain('No indices for search')
    })
  })
})
