import axios from 'axios'
import config from '../config'

export const loginUser = (data) => {
  return axios.post(`${config.authApiUrl}login/`, data).then(res => {
    window.localStorage.setItem('auth_token', res.data.auth_token)
    return res.data
  })
}

export const isLoggedIn = () => {
  return !!window.localStorage.getItem('auth_token')
}

export const logoutUser = () => {
  const hash = 'Token ' + window.localStorage.getItem('auth_token')
  axios({
    method: 'post',
    url: `${config.authApiUrl}logout/`,
    headers: {'Authorization': hash}
  })
  window.localStorage.removeItem('auth_token')
}
