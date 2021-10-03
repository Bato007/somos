import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import './VResources.css'

const DeleteButton = ({ resourceId }) => {
  const history = useHistory()

  // Eliminar recurso
  const delResource = () => {
    fetch(`http://localhost:3001/admin/resources/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    })
  }

  const showAlert = () => {
    swal({
      title: 'Eliminar recurso',
      text: '¿Está seguro que desea eliminar el recurso?',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then((res) => {
      if (res) {
        delResource()
        history.push('./home')
      }
    })
  }

  return (
    <div>
      <div id="delButton">
        <center>
          <button type="button" onClick={showAlert} className="buttonDelete">a</button>
        </center>
      </div>
    </div>
  )
}

DeleteButton.propTypes = {
  resourceId: PropTypes.string.isRequired,
}

export default DeleteButton
