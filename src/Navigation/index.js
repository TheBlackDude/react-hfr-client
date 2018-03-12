import React from 'react'
import Menu from './Menu'
import LogoBox from './LogoBox'

export const Nav = () => (
  <header>
    <nav className='navbar navbar-expand-lg navbar-light navbar-custom'>
      <div className='container-fluid'>
        <div className='col col-md-6 no-padding'>
          <LogoBox />
        </div>
        <div className='col col-md-6 no-padding'>
          <div className='collapse navbar-collapse float-right' id='navbarSupportedContent'>
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  </header>
)

const Navigation = () => {
  return (
    <Nav />
  )
}

export default Navigation
