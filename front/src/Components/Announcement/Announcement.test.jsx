import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Announcement from './AnnouncementAdmin'

describe('Announcement tests', () => {
  test('Announcement renders', () => {
    render(<Announcement />)
  })
  test('Announcement is declined', async () => {
    const announcement = render(<Announcement />)
    const closeButton = await screen.getByRole('button', { pressed: false })
    userEvent.click(closeButton)

    // Se elimina y se manda un mensaje de rechazo al remitente
    expect(announcement.getAllByRole('announcement')).toHaveLength(0)
  })
  test('Announcement is accepted', async () => {
    const announcement = render(<Announcement />)
    const acceptButton = await screen.getByRole('button', { pressed: true })
    userEvent.click(acceptButton)

    /* Si el anuncio es aceptado, ya no se muestran
    los botones de aceptar/declinar solo el de borrar */
    expect(announcement.getAllByRole('button')).toHaveLength(1)
  })
})
