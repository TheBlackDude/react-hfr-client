import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import Authentication from '../authentication/Authentication'

import About from '../About'
import DiffContainer from '../diff/DiffContainer'
import NotFound from '../Helper/NotFound'

const toDiff = () => (
  <Redirect to='/diff' />
)

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path='/' render={toDiff} />
      <Route exact path='/diff' component={DiffContainer} />
      <Route exact path='/login' component={Authentication} />
      <Route exact path='/about' component={About} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default AppRoutes
