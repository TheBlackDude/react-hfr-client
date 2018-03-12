import fetch from '../utils/fetch'
import makeLoader from '../utils/loader'
import config from '../config'

// export const API_URL = `${config.apiUrl}comparison/level-3/`
export const COMPARISON_URL = `${config.apiUrl}comparison`
export const CHIEFDOM_URL = `${config.apiUrl}comparison/level-3/`
export const FACILITIES_URL = `${config.apiUrl}comparison/level-4/`

export const loader = makeLoader('hfr/diff', 'chiefdoms')

export const fetchChiefdoms = (config) => {
  return (dispatch) => {
    const onSuccess = (response) => {
      const result = {
        diffData: response.data.results,
        nextUrl: response.data.next,
        previousUrl: response.data.previous,
        totalItems: response.data.count
      }
      dispatch(loader.actions.success(result))
    }
    const onError = (error) => {
      dispatch(loader.actions.error(error))
    }
    dispatch(loader.actions.request())
    return fetch(config).then(onSuccess).catch(onError)
  }
}

export default loader.reducer
