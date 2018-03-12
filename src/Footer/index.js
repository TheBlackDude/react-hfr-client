import React from 'react'
// Local imports
import eHealthLogo from '../assets/images/ehealth-logo.png'
import SLELogo from '../assets/images/sierra-leone-logo.png'

const Footer = () => (
  <footer>
    <div className='row'>
      <div className='col-md-6 text-left'>
        <span>{(new Date().getFullYear())}</span>
        <span className='copyright'> © SLHFR | | v1.0.0</span>
      </div>
      <div className='col-md-6'>
        <ul className='list-inline social-buttons pull-right'>
          <li className='list-inline-item'>
            <img alt='eHealth Systems Africa' src={eHealthLogo} className='img-fluid pull-right' />
          </li>
          <li className='list-inline-item'>
            <img alt='Sierra Leone' src={SLELogo} className='img-fluid pull-right' />
          </li>
        </ul>
      </div>
    </div>
  </footer>
)

export default Footer
