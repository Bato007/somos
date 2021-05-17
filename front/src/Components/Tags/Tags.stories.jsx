import React from 'react'
import Tags from './Tags'
import './Tags'

export default {
  title: 'Tags',
  component: Tags,
}

const Template = (args) => <Tags {...args} />

export const constantTags = Template.bind({})
constantTags.args = {
  showTags: ['ppt', 'voluntariado']
}

export const closableTags = Template.bind({})
closableTags.args = {
  showTags: ['bato', 'iglesia'],
  isClosable: true,
}

