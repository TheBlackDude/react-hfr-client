import './mock-localStorage'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import makeLoader from './loader'

describe('makeLoader', () => {
  const loader = makeLoader('hfr/diff', 'hfr')
  const initialState = {
    'hfr': {
      data: null,
      loading: false,
      error: null
    }
  }
  const mockStore = configureMockStore([thunk])({initialState})

  it('should expose {actions,hasData,initialState,isLoading,reducer,steps}', () => {
    expect(loader.actions).toBeDefined()
    expect(loader.initialState).toBeDefined()
    expect(loader.reducer).toBeDefined()
  })

  it('reducer should return a newState if state changes', () => {
    const result = ['test1', 'test2']
    mockStore.dispatch(loader.actions.success(result))
    const action = mockStore.getActions()[0]
    const newState = loader.reducer(initialState, action)
    expect(newState).not.toEqual(initialState)
    expect(newState.hfr.data).toEqual(result)
  })

  it("should not return a newState if state don't change", () => {
    const action = {'type': 'NOTHING'}
    const sameState = loader.reducer(initialState, action)
    expect(sameState).toEqual(initialState)
  })
})
