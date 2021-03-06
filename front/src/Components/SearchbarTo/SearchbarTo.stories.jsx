import React from 'react'
import SearchbarTo from './SearchbarTo'
import './SearchbarTo.css'

export default {
  title: 'SearchbarTo',
  component: SearchbarTo,
}

const Template = (args) => <SearchbarTo {...args} />

export const SearchbarToSend = Template.bind({})
SearchbarToSend.args = {
  setAccounts: () => {},
  setCategories: () => {},
}
