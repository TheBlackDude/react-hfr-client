const makeLoader = (modulePrefix, name) => {
  const format = (name, step) => {
    return `${modulePrefix}/${name.toUpperCase()}_${step}`
  }
  const steps = {
    request: format(name, 'REQUEST'),
    success: format(name, 'SUCCESS'),
    error: format(name, 'ERROR')
  }
  const initialState = {
    [name]: {
      data: null,
      loading: false,
      error: null
    }
  }
  const onRequest = (state) => {
    return {
      ...state,
      [name]: {
        data: null,
        error: null,
        loading: true
      }
    }
  }
  const onSuccess = (state, action) => {
    return {
      ...state,
      [name]: {
        data: action.payload,
        error: null,
        loading: false
      }
    }
  }
  const onError = (state, action) => {
    return {
      ...state,
      [name]: {
        data: null,
        error: action.payload,
        loading: false
      }
    }
  }
  const request = () => {
    return {
      type: steps.request
    }
  }
  const success = (result) => {
    return {
      type: steps.success,
      payload: result
    }
  }
  const error = (error) => {
    return {
      type: steps.error,
      payload: error
    }
  }
  const updates = {
    [steps.request]: onRequest,
    [steps.success]: onSuccess,
    [steps.error]: onError
  }
  const reducer = (state = initialState, action) => {
    const update = updates[action.type]
    return update ? update(state, action) : state
  }
  const isLoading = (state) => {
    return !!state[name].loading
  }
  const hasData = (state) => {
    return !!state[name].data
  }
  return {
    actions: { request, success, error },
    hasData,
    initialState,
    isLoading,
    reducer,
    steps
  }
}

export default makeLoader
