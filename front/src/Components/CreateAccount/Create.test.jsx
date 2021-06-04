import { render } from '@testing-library/react'
import React from 'react'
import Create from './Create'

describe('Create tests', () => {
  test('Create render', () => {
    render(<Create />)
  })
})