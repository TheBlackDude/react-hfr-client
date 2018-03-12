/* Action Types */
export const RESET = 'hfr/authentication/RESET'
export const LOGIN_USER_SUCCESS = 'hfr/authentication/LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'hfr/authentication/LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'hfr/authentication/LOGOUT_USER'

/* Default State */
export const defaultState = {
  user: null,
  authenticated: false,
  error: null
}

/* Action Creators */
export const reset = () => {
  return {
    type: RESET
  }
}

export const loginUserSucces = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  }
}

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error
  }
}

export const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case RESET:
      return defaultState
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        error: null
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: null,
        authenticated: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer
