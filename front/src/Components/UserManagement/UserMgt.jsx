/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import swal from 'sweetalert'
import Button from '../Button/Button'
import SearchbarTo from '../SearchbarTo/SearchbarTo'
import 'reactjs-popup/dist/index.css'

import './UserMgt.css'

const UserMgt = () => {
  const [userInfo, setUserInfo] = useState([])
  const [categories, setCategories] = useState([])

  const getUsersInfo = async () => {
    const data = await fetch('http://localhost:3001/admin/user', {
      method: 'GET',
    }).then((res) => res.json()).then((res) => res)

    setUserInfo(data)
  }

  const deleteUser = async (username) => {
    await fetch(`http://localhost:3001/admin/user/${username}`, {
      method: 'DELETE',
    })

    getUsersInfo()
  }

  const activateUser = async (user) => {
    const data = {
      username: user,
    }
    await fetch('http://localhost:3001/admin/user/activate', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
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
    await fetch('http://localhost:3001/admin/user/desactivate', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    })

    getUsersInfo()
  }

  useEffect(() => {
    getUsersInfo()
  }, [])

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
                            lastResult={categories}
                          />
                          <div className="popupButtons">
                            <Button id="CancelButton" name="Cancelar" onClick={close} />
                            <Button id="UploadButton" name="Guardar" />
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

export default UserMgt
