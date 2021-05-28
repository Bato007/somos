import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResourcePreview from './ResourcePreview'

describe('Resource Preview tests', () => {
  test('Resource Preview renders', () => {
    render(<ResourcePreview availableResources={[{title: 'test', resource: 'file'}]} />)
  })
  test('Resource Preview shows content', () => {
    const resourcesPreviews = render(<ResourcePreview availableResources={[{title: 'test', resource: 'file'}, {title: 'test doc', resource: 'file.doc'}]} />)

    expect(resourcesPreviews.getAllByRole('img')).toHaveLength(2)
  })
  test('Resource Preview is clickeable', () => {
    const resourcesPreviews = render(<ResourcePreview availableResources={[{title: 'test', resource: 'file'}, {title: 'test doc', resource: 'file.doc'}]} />)

    userEvent.click(resourcesPreviews.getAllByRole('img')[0])
  })
})