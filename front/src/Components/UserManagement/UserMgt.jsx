/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import swal from 'sweetalert'
import Button from '../Button/Button'
import SearchbarTo from '../SearchbarTo/SearchbarTo'
import apiURL from '../fetch'
import 'reactjs-popup/dist/index.css'

import './UserMgt.css'

const UserMgt = ({ display }) => {
  const [userInfo, setUserInfo] = useState([])
  const [categories, setCategories] = useState([])

  const getUsersInfo = async () => {
    const data = await fetch(`${apiURL}/admin/user`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json()).then((res) => res)
    setUserInfo(data)
  }

  const deleteUser = async (username) => {
    await fetch(`${apiURL}/admin/user/${username}`, {
      method: 'DELETE',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    })

    getUsersInfo()
  }

  const activateUser = async (user) => {
    const data = {
      username: user,
    }
    await fetch(`${apiURL}/admin/user/activate`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}` },
    })
    getUsersInfo()
  }

  const showConfirm = (user) => {
    swal({
      title: 'Eliminar usuario',
      text: '¿Estas seguro que desea eliminar al usuario?',
      icon: 'warning',
      buttons: ['Cancelar', 'Confirmar'],
    }).then((res) => {
      if (res) {
        deleteUser(user)
      }
    })
  }

  const deactivateUser = async (user) => {
    const data = {
      username: user,
    }
    await fetch(`${apiURL}/admin/user/desactivate`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}` },
    })

    getUsersInfo()
  }

  const updateCategories = async (close, username) => {
    console.log(close, username)
    close()
    await fetch(`${apiURL}/admin/user/other/category`, {
      method: 'PUT',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, categories }),
    })
    getUsersInfo()
  }

  useEffect(() => {
    getUsersInfo()
  }, [])

  if (display === 0) {
    return null
  }

  return (
    <div className="page-container">
      <div className="managementbkgr">
        <div className="management">
          <h1 className="titulos">Nombre</h1>
          <h1 className="titulos">Usuario</h1>
          <h1 className="titulos onMobileHide">Email</h1>
          <h1 className="titulos estado">Estado</h1>
        </div>
        <div className="users-container">
          { userInfo.length > 0
            ? (
              <>
                { userInfo.map((value, index) => (
                  <div className="usersmanaged" key={index}>
                    <Popup
                      modal
                      nested
                      trigger={
                        <Button id="editAccount" />
                      }
                      position="center center"
                    >
                      {(close) => (
                        <>
                          <h1>
                            Editar categorías del usuario:&nbsp;
                            {value.name}
                          </h1>
                          <SearchbarTo
                            setCategories={setCategories}
                            creatingAccount
                            lastResult={value.categories}
                          />
                          <div className="popupButtons">
                            <Button id="CancelButton" name="Cancelar" onClick={close} />
                            <Button id="UploadButton" name="Guardar" onClick={() => updateCategories(close, value.username)} />
                          </div>
                        </>
                      )}
                    </Popup>

                    <h3 className="name">{value.name}</h3>
                    <h3 className="titulos data">{value.username}</h3>
                    <h4 className="titulos onMobileHide">{value.email}</h4>
                    { value.active
                      ? <div className="changeButton"><Button id="active" onClick={() => deactivateUser(value.username)} /></div>
                      : <div className="changeButton"><Button id="notactive" onClick={() => activateUser(value.username)} /></div> }
                    <Button id="removeAccount" onClick={() => showConfirm(value.username)} />
                  </div>
                )) }
              </>
            )
            : '' }
        </div>
      </div>
    </div>
  )
}

UserMgt.propTypes = {
  display: PropTypes.number.isRequired,
}

export default UserMgt
