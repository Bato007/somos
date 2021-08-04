/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Active from './icons/active.png'
import Inactive from './icons/notactive.png'
import Trash from './icons/trash.png'

import './UserMgt.css'

const UserMgt = () => {
  const [userInfo, setUserInfo] = useState([])

  const getUsersInfo = async () => {
    await fetch('http://localhost:3001/user', {
      method: 'GET',
    }).then((res) => res.json().then((data) => setUserInfo(data)))
  }

  const deletUser = (username) => {
    fetch(`https://localhost:3001/usermanagement/${username}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }

  const activateUser = (username) => {
    fetch('https://localhost:3001/usermanagement/activate', {
      method: 'PUT',
      body: JSON.stringify(username),
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error('Error', e))
      .then((out) => {
        console.log(out)
      })
  }

  const deactivateUser = (username) => {
    fetch('https://localhost:3001/usermanagement/desactivate', {
      method: 'PUT',
      body: JSON.stringify(username),
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error('Error', e))
      .then((out) => {
        console.log(out)
      })
  }

  useEffect(() => {
    getUsersInfo()
  }, [])

  return (
    <div className="page-container">
      <NavBar />
      <div className="managementbkgr">
        <div className="management">
          <h1 className="titulos">Nombre</h1>
          <h1 className="titulos">Usuario</h1>
          <h1 className="titulos">Email</h1>
          <h1 className="titulos">Estado</h1>
        </div>
        <div className="users-container">
          {
            userInfo.length > 0
              ? userInfo.map((value, index) => {
                if (value.active) {
                  return (
                    <div className="usersmanaged" key={index}>
                      <h3 className="titulos">{value.name}</h3>
                      <h3 className="titulos">{value.username}</h3>
                      <h5 className="titulos">{value.email}</h5>
                      <div className="imagen">
                        <img className="mgtimage" src={Inactive} alt="active" onClick={() => activateUser(value.username)} />
                      </div>
                      <div className="trash-container">
                        <img className="mgtimage" src={Trash} alt="trash" onClick={() => deletUser(value.username)} />
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="usersmanaged" key={index}>
                    <h3 className="titulos">{value.name}</h3>
                    <h3 className="titulos">{value.username}</h3>
                    <h5 className="titulos">{value.email}</h5>
                    <div className="imagen">
                      <img className="mgtimage" src={Active} alt="active" onClick={() => deactivateUser(value.username)} />
                    </div>
                    <div className="trash-container">
                      <img className="mgtimage" src={Trash} alt="trash" onClick={() => deletUser(value.username)} />
                    </div>
                  </div>
                )
              }) : ''
          }
        </div>
      </div>
    </div>
  )
}

export default UserMgt
