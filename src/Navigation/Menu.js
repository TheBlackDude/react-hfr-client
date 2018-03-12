import React from 'react'

import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {logoutUser} from '../authentication/utils'
import {reset} from '../authentication/redux'

const MenuLinks = ({dispatch}) => {
  const handleLogout = () => {
    logoutUser()
    dispatch(reset())
  }

  return (
    <div className='navbar-collapse'>
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <NavLink
            activeClassName='active'
            to='/diff'>
            <i className='fa fa-th-list' />Comparison
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName='active'
            to='/about'>
            <i className='fa fa-info-circle' />About
          </NavLink>
        </li>
        <li className='logout'>
          <NavLink
            activeClassName='active'
            to='/' onClick={handleLogout}>
            <i className='fa fa-sign-out' /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default connect()(MenuLinks)
