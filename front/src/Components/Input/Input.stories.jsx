/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import Input from './Input'
import './Input.css'

export default {
  title: 'Input',
  component: Input,
}

const Template = (args) => <Input {...args} />

export const Login = Template.bind({})
Login.args = {
  id: "InputLogin",
  type: "text",
  name: "Username",
  placeholder: "Username"
}
