
import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/styles.css'
import './assets/css/style-guide/style.css'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { reducer as reduxFormReducer } from 'redux-form'

import { authenticationReducer } from './authentication'
import diff from './diff'
import registerServiceWorker from './registerServiceWorker'

import { MainApp } from './Main'
import fetch from './utils/fetch'
// for trying things out purposes
window.__hfr = {fetch}

/* Create history */
const history = createHashHistory()

/*
 * Create the Store
 */
const createStoreWithState = (initialState = {}) => createStore(
  connectRouter(history)(
    combineReducers({
      authentication: authenticationReducer,
      diff: diff.reducer,
      form: reduxFormReducer
    })
  ),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
    // other store enhancers will go here
  )
)

const store = createStoreWithState()

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainApp />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'))
registerServiceWorker()
