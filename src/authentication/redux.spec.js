import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  reset,
  loginUserSucces,
  loginUserFailure,
  reducer
} from './redux'

describe('Authentication reducer', () => {
  const store = configureMockStore([thunk])()
  const defaultState = {
    user: null,
    authenticated: false,
    error: null
  }

  it('loginUserSucces set user and authenticated to true', () => {
    store.dispatch(loginUserSucces('test1'))
    const actions = store.getActions()
    const newState = actions.reduce(reducer, actions)
    expect(newState).not.toEqual(defaultState)
    expect(newState.authenticated).toBeTruthy()
    expect(newState.user).toEqual('test1')
  })

  it('loginUserFailure sets only error', () => {
    store.dispatch(loginUserFailure('bad request'))
    const actions = store.getActions()
    const newState = actions.reduce(reducer, actions)
    expect(newState).not.toEqual(defaultState)
    expect(newState.error).toEqual('bad request')
    expect(newState.authenticated).toBeFalsy()
  })

  it('reset the state', () => {
    store.dispatch(reset())
    const actions = store.getActions()
    const newState = actions.reduce(reducer, actions)
    expect(newState).toEqual(defaultState)
  })
})
