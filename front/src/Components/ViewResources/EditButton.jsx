import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './VResources.css'

const EditButton = ({ resourceId }) => {
  const [editInfo, setEditInfo] = useState({ title: ' ', description: ' ' })
  let title = editInfo
  let description = editInfo

  const handleChangeEdit = (event) => {
    setEditInfo({
      ...editInfo,
      [event.target.name]: event.target.value,
    })
  }

  function getResourceInfo() {
    fetch(`http://localhost:3001/resources/${resourceId}`)
      .then((r) => r.json())
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
        getResourceInfo()
      }
    }
    console.log('este es el console', resourceId)
  }
  return (
    <div className="headers">
      <div id="editResource">
        <button type="button" className="buttonEdit" onClick={EditSource} onChange={handleChangeEdit}>a</button>
      </div>
    </div>
  )
}

EditButton.propTypes = {
  resourceId: PropTypes.string.isRequired,
}

export default EditButton
