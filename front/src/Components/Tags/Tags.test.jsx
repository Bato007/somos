import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tags from './Tags'

describe('Tags tests', () => {
  test('Tags render', () => {
    render(<Tags />)
  })
  test('Tag is visible', () => {
    const dummyTags = ['bato']
    render(<Tags showTags={dummyTags} />)

    expect(screen.getAllByRole('list')).toHaveLength(1)
  })
  test('Tag is closeable', () => {
    const dummyTags = ['bato', 'church']
    render(<Tags showTags={dummyTags} isClosable />)

    userEvent.click(screen.getAllByRole('button')[0])

    expect(screen.getAllByRole('list')).toHaveLength(1)
  })
})
