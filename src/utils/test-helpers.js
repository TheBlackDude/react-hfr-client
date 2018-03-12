import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import {Provider} from 'react-redux'

/*
 * render the passed in commponent with a store
 */
export const renderWithStore = (store, component) => {
  const wrappedComponent = (
    <Provider store={store}>{component}</Provider>
  )
  return ReactTestUtils.renderIntoDocument(wrappedComponent)
}
