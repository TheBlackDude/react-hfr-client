import '../utils/mock-localStorage'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

import {fetchChiefdoms, CHIEFDOM_URL} from './redux'

describe('fetchChiefdoms', () => {
  const initialState = {
    'chiefdoms': {
      data: null,
      loading: false,
      error: null
    }
  }
  const config = {
    url: CHIEFDOM_URL
  }
  const mockStore = configureMockStore([thunk])({initialState})
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('should dispatch a request action', () => {
    mockStore.dispatch(fetchChiefdoms(config))
    const action = mockStore.getActions()[0]
    expect(action.type).toEqual('hfr/diff/CHIEFDOMS_REQUEST')
  })

  it('should dispatch a success action when request is successfull', () => {
    /* Mock api calls */
    moxios.stubRequest(CHIEFDOM_URL, {
      status: 200,
      response: {
        'results': {'code': '9090', 'name': 'test1'},
        'next': 'http//www.test.com',
        'previous': 'http//www.test.com',
        'count': 1
      }
    })

    return mockStore.dispatch(fetchChiefdoms(config)).then(() => {
      const successState = mockStore.getActions()[2]
      expect(successState.type).toEqual('hfr/diff/CHIEFDOMS_SUCCESS')
      expect(successState.payload).toMatchObject(
        {
          'diffData': {'code': '9090', 'name': 'test1'},
          'nextUrl': 'http//www.test.com',
          'previousUrl': 'http//www.test.com',
          'totalItems': 1
        }
      )
    })
  })

  it('should dispatch an error action if the request fails', () => {
    /* Mock api calls */
    moxios.stubRequest(CHIEFDOM_URL, {
      status: 400,
      response: {}
    })

    return mockStore.dispatch(fetchChiefdoms(config)).then(() => {
      const errorState = mockStore.getActions()[4]
      expect(errorState.type).toEqual('hfr/diff/CHIEFDOMS_ERROR')
      expect(errorState.payload.toString()).toEqual('Error: Request failed with status code 400')
    })
  })
})
