import React from 'react'
import List from './List'
import './List.css'

export default {
  title: 'List',
  component: List,
}

const Template = (args) => <List {...args} />

export const searchList = Template.bind({})
searchList.args = {
  actualSearch: 'to',
}

export const typesList = Template.bind({})
typesList.args = {
  showTypes: true,
}

export const usernamesList = Template.bind({})
usernamesList.args = {
  showUsernames: true,
}
