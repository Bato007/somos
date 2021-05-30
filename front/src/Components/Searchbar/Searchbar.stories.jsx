import React from 'react'
import Searchbar from './Searchbar'
import './Searchbar.css'

export default {
  title: 'Searchbar',
  component: Searchbar,
}

const Template = (args) => <Searchbar {...args} />

export const SearchbarDefault = Template.bind({})
