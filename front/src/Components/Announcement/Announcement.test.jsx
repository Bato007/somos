import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Announcement from './Announcement'

describe('Announcement tests', () => {
  test('Announcement renders', () => {
    render(<Announcement />)
  })
  test('Announcement is declined', () => {
    const announcement = render(<Announcement />)
    const closeButton = announcement.getByRole('button', { pressed: false })
    userEvent.click(closeButton)

    // Se elimina y se manda un mensaje de rechazo al remitente
    expect(announcement.getAllByRole('announcement')).toHaveLength(0)
  })
  test('Announcement is accepted', () => {
    const announcement = render(<Announcement />)
    const acceptButton = announcement.getByRole('button', { pressed: true })
    userEvent.click(acceptButton)

    /* Si el anuncio es aceptado, ya no se muestran
    los botones de aceptar/declinar solo el de borrar */
    expect(announcement.getAllByRole('button')).toHaveLength(1)
  })
})
