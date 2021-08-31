/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, TextField } from '@material-ui/core'
import './VResources.css'

const EditButton = ({ resourceId }) => {
  const [editInfo, setEditInfo] = useState({ title: ' ', description: ' ', available: ' ' })
  let { title } = editInfo
  let description = editInfo.title
  let { available } = editInfo
  const [modal, setModal] = useState(false)
  const [titleUpd, setTitleUpd] = useState('')
  const [descUpd, setDescUpd] = useState('')
  const [dateUpd, setDateUpd] = useState('')

  const [resInfo, setResInfo] = useState({ })
  // Fetch para obtener la informacion del recurso seleccionado
  const setResourceInfo = async () => {
    const json = await fetch(`http://localhost:3001/resources/${resourceId}`, {
      method: 'GET',
    }).then((res) => res.json())
    setResInfo(json)
  }

  useEffect(() => {
    setResourceInfo()
  }, [])

  // window para editar
  const abrirCerrarModal = () => {
    setModal(!modal)
  }

  const handleChangeEdit = (event) => {
    setEditInfo({
      ...editInfo,
      [event.target.name]: event.target.value,
    })
  }

  // Obteniendo la fecha actual para las dates disponibles en el recurso
  const dateF = () => {
    const today = new Date()
    const month = today.getMonth() + 1

    if (month.toString().length === 1) {
      return `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
    }
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  }

  const actualDate = dateF()

  const EditSource = async () => {
    if (title !== '' || description !== '' || available !== '') {
      if (editInfo.title === '') {
        title = titleUpd
      }
      if (editInfo.description === '') {
        description = descUpd
      }
      if (editInfo.description !== '') {
        description = resInfo.description
      }
      if (editInfo.available === '') {
        available = dateUpd
      }
      if (editInfo.available !== '') {
        available = resInfo.available
      }
      if (editInfo.title !== '') {
        title = resInfo.title
        const id = resourceId
        const { tags } = resInfo
        const category = resInfo.categories
        const { users } = resInfo
        await fetch(`http://localhost:3001/resources/${resourceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id, title: titleUpd || title, description: descUpd || description, tags, category, users, date: dateUpd || available,
          }),
        }).then((response) => response.json())
      }
    }
  }

  const handleTitleChange = () => {
    setTitleUpd(document.getElementById('titleChangeVR').value)
  }

  const handleDescChange = () => {
    setDescUpd(document.getElementById('descriptionChangeVR').value)
  }

  const handleDateChange = () => {
    setDateUpd(document.getElementById('dateModify').value)
  }
  const body = (
    <div id="edit">
      <div className=" makeStyles-modal makeStyles-modal-1">
        <h2>Edición del recurso</h2>
        <TextField id="titleChangeVR" label={resInfo.title} onChange={() => handleTitleChange()} />
        <TextField id="descriptionChangeVR" label={resInfo.description} onChange={() => handleDescChange()} />
        <TextField id="dateModify" type="date" label={resInfo.available} min={actualDate} onChange={() => handleDateChange()} />
        <div className="buttonsEdit">
          <button type="button" className="closeButton" onClick={() => abrirCerrarModal()}>cancel</button>
          <button
            type="button"
            className="saveButton"
            onClick={() => {
              const botonEditar = EditSource()
              const refresh = window.location.reload(false)
              botonEditar()
              refresh()
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="headers">
      <div id="editResource">
        <Modal
          open={modal}
          onClose={abrirCerrarModal}
        >
          {body}
        </Modal>
        <button type="button" className="buttonEdit" onClick={() => abrirCerrarModal()} onChange={handleChangeEdit}>a</button>
      </div>
    </div>
  )
}

EditButton.propTypes = {
  resourceId: PropTypes.string.isRequired,
}

export default EditButton