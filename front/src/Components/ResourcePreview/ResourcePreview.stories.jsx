import React from 'react'
import ResourcePreview from './ResourcePreview'
import './ResourcePreview'

export default {
  title: 'ResourcePreview',
  component: ResourcePreview,
}

const Template = (args) => <ResourcePreview {...args} />

export const homeResource = Template.bind({})
homeResource.args = {
  availableResources: [{title: 'test', resource: 'file'}, {title: 'test doc', resource: 'file.doc'}],
}
