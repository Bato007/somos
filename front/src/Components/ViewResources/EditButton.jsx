import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, TextField } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import './VResources.css'
import apiURL from '../fetch'

const EditButton = ({ resourceId }) => {
  const [editInfo, setEditInfo] = useState({
    title: ' ', description: ' ', available: ' ', tags: ' ',
  })
  let { title } = editInfo
  let description = editInfo.title
  let { available } = editInfo
  let { tags } = editInfo
  const [modal, setModal] = useState(false)
  const [titleUpd, setTitleUpd] = useState('')
  const [descUpd, setDescUpd] = useState('')
  const [dateUpd, setDateUpd] = useState('')
  const [tagUpd, setTagUpd] = useState('')

  const [resInfo, setResInfo] = useState({ })
  // Fetch para obtener la informacion del recurso seleccionado
  const setResourceInfo = async () => {
    const json = await fetch(`${apiURL}/resources/${resourceId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
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
    if (title !== '' || description !== '' || available !== '' || tags !== '') {
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
      if (editInfo.tags === '') {
        tags = tagUpd
      }
      if (editInfo.tags !== '') {
        tags = resInfo.tags
      }
      if (editInfo.title !== '') {
        title = resInfo.title
        const id = resourceId
        // const { tags } = resInfo
        const category = resInfo.categories
        const { users } = resInfo
        const { filename } = resInfo
        await fetch(`${apiURL}/admin/resources`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            somoskey: `${localStorage.getItem('somoskey')}`,
          },
          body: JSON.stringify({
            id,
            title: titleUpd || title,
            description: descUpd || description,
            tags: tagUpd || tags,
            category,
            users,
            date: dateUpd || available,
            filename,
          }),
        }).then((res) => {
          if (res.status === 200) {
            window.location.reload(true)
          }
        })
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

  // Necesito ver si esta funcion funciona como debe
  const handleDelete = () => () => {
    setTagUpd(document.getElementById('tagModify').value)
    // setTagUpd((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
  }

  const body = (
    <div id="edit">
      <div className=" makeStyles-modal makeStyles-modal-1">
        <h2>Edición del recurso</h2>
        <TextField id="titleChangeVR" label={resInfo.title} onChange={() => handleTitleChange()} />
        <TextField id="descriptionChangeVR" label={resInfo.description} onChange={() => handleDescChange()} />
        <div className="tagsButtons">
          {resInfo.tags !== undefined
            ? resInfo.tags.map((tag) => <Chip label={tag} onDelete={handleDelete(resInfo)} />)
            : null}
        </div>
        <TextField id="dateModify" type="date" defaultValue={resInfo.available} label={resInfo.available} inputProps={{ min: actualDate }} onChange={() => handleDateChange()} />
        <div className="buttonsEdit">
          <button type="button" className="closeButton" onClick={() => abrirCerrarModal()}>cancel</button>
          <button
            type="button"
            className="saveButton"
            onClick={() => {
              const botonEditar = EditSource()
              botonEditar()
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
