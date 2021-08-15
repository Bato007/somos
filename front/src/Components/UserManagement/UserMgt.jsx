/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'

import './UserMgt.css'

const UserMgt = () => {
  const [userInfo, setUserInfo] = useState([])

  const getUsersInfo = async () => {
    const data = await fetch('http://localhost:3001/user', {
      method: 'GET',
    }).then((res) => res.json()).then((res) => res)

    setUserInfo(data)
  }

  const deleteUser = async (username) => {
    await fetch(`http://localhost:3001/user/${username}`, {
      method: 'DELETE',
    })

    getUsersInfo()
  }

  const activateUser = async (user) => {
    const data = {
      username: user,
    }
    await fetch('http://localhost:3001/user/activate', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
    })
    getUsersInfo()
  }

  const deactivateUser = async (user) => {
    const data = {
      username: user,
    }
    await fetch('http://localhost:3001/user/desactivate', {
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
          <h1 className="titulos">Email</h1>
          <h1 className="titulos estado">Estado</h1>
        </div>
        <div className="users-container">
          { userInfo.length > 0
            ? (
              <>
                { userInfo.map((value, index) => (
                  <div className="usersmanaged" key={index}>
                    <h3 className="titulos">{value.name}</h3>
                    <h3 className="titulos">{value.username}</h3>
                    <h5 className="titulos">{value.email}</h5>
                    { value.active
                      ? <Button id="active" onClick={() => deactivateUser(value.username)} />
                      : <Button id="notactive" onClick={() => activateUser(value.username)} /> }
                    <Button id="removeAccount" onClick={() => deleteUser} />
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
