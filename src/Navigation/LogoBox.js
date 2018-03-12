import React from 'react'

import {Link} from 'react-router-dom'

import logo from '../assets/images/logo.svg'

const LogoBox = () => {
  return (
    <div>
      <Link className='navbar-brand' to='#'>
        <img alt='logo' width='150px' height='45px' src={logo} />
      </Link>
      <button
        className='navbar-toggler'
        type='button' data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>
    </div>
  )
}

export default LogoBox
