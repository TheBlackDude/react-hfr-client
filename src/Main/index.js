import React from 'react'
import Navigation from '../Navigation'
import AppRoutes from './Routes'
import Footer from '../Footer'
import { Redirect } from 'react-router'

import { Route } from 'react-router-dom'
import Authentication from '../authentication/Authentication'
import {isLoggedIn} from '../authentication/utils'

export const MainApp = () => {
  if (!isLoggedIn()) {
    return (
      <div>
        <Redirect to='/login' />
        <Route exact path='/login' component={Authentication} />
      </div>
    )
  }
  return (
    <section className='content section-top'>
      <Navigation />
      <AppRoutes />
      <Footer />
    </section>
  )
}
