import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List tests', () => {
  test('List renders', () => {
    render(<List />)
  })
  test('List shows usernames', () => {
    const contactList = render(<List showUsernames />)

    expect(contactList.getAllByRole('listitem')).toHaveLength(2)
  })
  test('List shows types', () => {
    const contactList = render(<List showTypes />)

    expect(contactList.getAllByRole('listitem')).toHaveLength(3)
  })
  test('List shows usernames depending the type', () => {
    const contactList = render(<List actualSearch="ch" />)
    const button = contactList.getByRole('button')

    userEvent.click(button)
    expect(contactList.getAllByRole('listitem')).toHaveLength(2)
  })
})
