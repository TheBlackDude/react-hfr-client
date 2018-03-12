import React from 'react'
import { shallow } from 'enzyme'
import {createStore} from 'redux'
import sinon from 'sinon'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import {renderWithStore} from '../utils/test-helpers'
import Navigation from './index'

describe('Navigation', () => {
  const dispatch = sinon.spy()
  const store = {
    dispatch
  }
  // When using a fake store, you can use an identity function as reducer
  const reduxStore = createStore((e) => e, store)
  it('should render', () => {
    const homeWithRouter = withRouter(<Navigation />)
    const homeWithStore = renderWithStore(reduxStore, <homeWithRouter />)
    const wrapper = shallow(<homeWithStore />)
    expect(wrapper.find(<Link to='/' />)).toBeTruthy()
  })
})
