import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, TextField } from '@material-ui/core'
import './VResources.css'

const EditButton = ({ resourceId }) => {
  const [editInfo, setEditInfo] = useState({ title: ' ', description: ' ' })
  let { title } = editInfo
  let description = editInfo.title
  const [modal, setModal] = useState(false)

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

  function EditSource(actualtitle, actualdescription) {
    if (title !== ' ' || description !== ' ') {
      if (editInfo.title === ' ') {
        title = actualtitle
      }
      if (editInfo.description === ' ') {
        description = actualdescription
      }
      if (editInfo.title !== ' ') {
        fetch(`http://localhost:3001/resources/${resourceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.text())
      }
    }
  }

  const body = (
    <div id="edit">
      <div className=" makeStyles-modal makeStyles-modal-1">
        <h2>Edición del recurso</h2>
        <TextField label={resInfo.title} />
        <hr />
        <TextField label={resInfo.title} />
        <div className="buttonsEdit">
          <button type="button" className="closeButton" onClick={() => abrirCerrarModal()}>cancel</button>
          <button
            type="button"
            className="saveButton"
            onClick={() => {
              const editS = EditSource()
              const refresh = window.location.href
              editS()
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
