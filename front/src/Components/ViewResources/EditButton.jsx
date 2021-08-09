import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './VResources.css'

const location = useLocation()
const resourceId = location.state.detail
const [resInfo, setResInfo] = useState({ })
const [editInfo, setEditInfo] = useState({ title: '', description: '' })
let title = editInfo
let description = editInfo

function getResourceInfo() {
  fetch(`http://localhost:3001/resources/${resourceId}`)
    .then((r) => r.json())
    .then((r) => setResInfo(r))
}

const EditButton = () => {
  const handleChangeEdit = (event) => {
    setEditInfo({
      ...editInfo,
      [event.target.name]: event.target.value,
    })
  }

  function EditSource(actualtitle, actualdescription) {
    if (title !== '' || description !== '') {
      if (editInfo.title === '') {
        title = actualtitle
      }
      if (editInfo.description === '') {
        description = actualdescription
      }
      if (editInfo.title !== '') {
        fetch(`http://localhost:3001/resources/${resourceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        }).then((response) => response.text())
        getResourceInfo()
      }
    }
  }

  return (
    <div className="headers">
      <div id="editResource">
        <button type="button" className="buttonEdit" onClick={() => EditSource(resInfo.title)} onChange={handleChangeEdit}>a</button>
      </div>
    </div>
  )
}

export default EditButton
