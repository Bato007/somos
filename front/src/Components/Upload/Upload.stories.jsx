import React from 'react'
import Upload from './Upload'
import './Upload'

export default {
  title: 'Upload',
  component: Upload,
}

const Template = (args) => <Upload {...args} />

export const UploadResource = Template.bind({})
