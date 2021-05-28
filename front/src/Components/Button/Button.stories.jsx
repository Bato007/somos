/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Button from './Button'
import './Button.css'

export default {
  title: 'Button',
  component: Button,
}

const Template = (args) => <Button {...args} />

export const SignIn = Template.bind({})
SignIn.args = {
  id: "SignIn",
  name: "Sign In"
}

export const Submit = Template.bind({})
Submit.args = {
  id: "UploadButton",
  name: "Submit"
}