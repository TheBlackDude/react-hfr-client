import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {withRouter} from 'react-router'

import { loginUserSucces, loginUserFailure } from './redux'
import {loginUser} from './utils'
import loginLogo from '../assets/images/logo.png'

/*
 * Cient Validation
 */

const copyRightText = `Copyright Health Facilities Registry, ${new Date().getFullYear()}`
const validate = (values) => {
  let errors = {}
  if (!values.username) {
    errors.username = 'Enter your username'
  }
  if (!values.password) {
    errors.password = 'Enter your password'
  }
  return errors
}

const authentication = (props) => {
  const { handleSubmit, pristine, submitting, dispatch, history } = props

  const onHandleSubmit = (data) => {
    loginUser(data)
      .then(() => {
        dispatch(loginUserSucces(data.username))
        history.push('/')
      })
      .catch(error => {
        dispatch(loginUserFailure(error.message))
      })
  }

  return (
    <div className='container-fluid login-bg'>
      <div className='row vertical-offset-100'>
        <div className='col-md-4 login-center-box'>
          <div className='panel'>
            <div>
              <img alt='login-logo' src={loginLogo} className='img-responsive img-center' />
            </div>
            <div className='panel-body login-box'>
              <form
                onSubmit={handleSubmit(onHandleSubmit)}
                method='post'
                name='loginForm'>
                <fieldset>
                  <div className='form-group'>
                    <Field
                      className='form-control radius-primary login-txtbx'
                      name='username'
                      component='input'
                      type='text'
                      placeholder='Username'
                    />
                  </div>
                  <div className='form-group'>
                    <Field
                      className='form-control radius-primary login-txtbx'
                      name='password'
                      component='input'
                      type='password'
                      placeholder='Password'
                    />
                  </div>
                  <button
                    type='submit'
                    className='btn btn-lg btn-primary btn-block radius-primary'
                    disabled={pristine || submitting}>
                    <i className='fa fa-sign-in' /> Log In
                  </button>
                </fieldset>
              </form>
            </div>
            <div className='copyright text-center'>
              {copyRightText}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'authenticationForm',
  validate
})(withRouter(authentication))
