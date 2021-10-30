import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResourcePreview from './ResourcePreview'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('Resource Preview tests', () => {
  test('Resource Preview renders', () => {
    render(<ResourcePreview availableResources={[{ id: '1', title: 'test', resource: 'file' }]} />)
  })
  test('Resource Preview shows content', () => {
    const resourcesPreviews = render(<ResourcePreview availableResources={[{ id: '2', title: 'test', resource: 'file' }, { id: '3', title: 'test doc', resource: 'file.doc' }]} />)

    expect(resourcesPreviews.getAllByRole('img')).toHaveLength(2)
  })
  test('Resource Preview is clickeable', () => {
    const resourcesPreviews = render(<ResourcePreview availableResources={[{ id: '3', title: 'test', resource: 'file' }, { id: '4', title: 'test doc', resource: 'file.doc' }]} />)

    userEvent.click(resourcesPreviews.getAllByRole('img')[0])
  })
})
