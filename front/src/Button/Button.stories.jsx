/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Button from './Button'
import './Button.css'

export default {
  title: 'Button',
  component: Button,
}

const Template = (args) => <Button {...args} />

export const Submit = Template.bind({})
Submit.args = {
  id: "SignIn",
  name: "Sign In"
}