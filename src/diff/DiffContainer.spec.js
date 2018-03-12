import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import ReactTestUtils from 'react-dom/test-utils'
import { mount } from 'enzyme'

import '../utils/mock-localStorage'
import {renderWithStore} from '../utils/test-helpers'
import DiffContainer, {Pagination} from './DiffContainer'

describe('DiffContainer', () => {
  const diff = {
    'chiefdoms': {
      'data': {
        'totalItems': 3,
        'diffData': [{
          'label': 'DIFFERENT',
          'hfr': {
            'code': '8080',
            'name': 'test1'
          },
          'dhis2': {
            'code': '9090',
            'name': 'test2'
          }
        }]
      }
    }
  }
  const store = {
    dispatch: sinon.spy(),
    diff
  }
  // When using a fake store, you can use an identity function as reducer
  const reduxStore = createStore((e) => e, store, applyMiddleware(thunk))

  xit('should render component with a h2 tag', () => {
    const componentWithStore = renderWithStore(reduxStore, <DiffContainer />)
    const h2 = ReactTestUtils.findRenderedDOMComponentWithTag(
      componentWithStore, 'h2'
    )
    expect(h2.textContent).toEqual('Chiefdoms Comparison')
  })

  xit('should contain chiefdoms in state', () => {
    const componentWithStore = renderWithStore(reduxStore, <DiffContainer />)
    const state = componentWithStore.store.getState()
    expect(state.diff).toEqual(diff)
  })

  xit('should have six paginations', () => {
    const component = mount(
      <Pagination
        currentPage={1}
        totalPages={2}
        handlePage={(e) => e} />
    )
    expect(component.find('a').length).toEqual(6)
  })
})
