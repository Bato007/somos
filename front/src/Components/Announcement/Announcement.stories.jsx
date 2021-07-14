import React from 'react'
import Announcement from './Announcement'
import './Announcement'

export default {
  title: 'Announcement',
  component: Announcement,
}

const Template = (args) => <Announcement {...args} />

export const adminAnnouncement = Template.bind({})
