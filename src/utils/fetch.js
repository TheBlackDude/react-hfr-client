import axios from 'axios'

const fetch = (config) => {
  const auth = 'Token ' + window.localStorage.getItem('auth_token')
  return axios({
    ...config,
    headers: {'Authorization': auth}
  })
}

export default fetch
