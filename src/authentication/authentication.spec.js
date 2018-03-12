import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import Authentication from './Authentication'

describe('Authentication', () => {
  it('should render a form', () => {
    const wrapper = shallow(<Authentication />)
    expect(wrapper.find(<Field
      name='username'
      component='input'
      type='text'
      placeholder='User Name'
      />)).toBeTruthy()
  })
})
