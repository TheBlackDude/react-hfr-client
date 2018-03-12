import '../utils/mock-localStorage'
import moxios from 'moxios'
import config from '../config'
import { loginUser, logoutUser } from './utils'

describe('Authentication Utils', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should loginUser', () => {
    moxios.stubRequest(`${config.authApiUrl}login/`, {
      status: 200,
      response: {'auth_token': '29292dldll2222ldeas'}
    })
    const user = {'username': 'test1', 'password': 'test1pass'}
    return loginUser(user).then(response => {
      expect(window.localStorage.getItem('auth_token')).toBeTruthy()
      expect(window.localStorage.getItem('auth_token')).toEqual('29292dldll2222ldeas')
    })
  })

  it('should logoutUser', () => {
    moxios.stubRequest(`${config.authApiUrl}logout/`, {
      status: 204,
      response: {}
    })
    logoutUser()
    expect(window.localStorage.getItem('auth_token')).toBeFalsy()
  })
})
