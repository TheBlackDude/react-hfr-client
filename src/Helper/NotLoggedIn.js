import React from 'react'
import {Link} from 'react-router-dom'

/**
 *(404 Component)
 */
export default (props) => (
  <div>
    <h1>Permission Denied</h1>
    <h2>You Need To LoggIn To Access Me</h2>
    <h3><Link to='/'><button>Go Back and LoggIn</button></Link></h3>
  </div>
)
