/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Active from './icons/active.png'
import Trash from './icons/trash.png'

import './UserMgt.css'

const UserMgt = () => {
  /* Fetch de los datos de los usuarios */
  const nombre = 'Brandon'
  const usuario = 'bato'
  const categorias = ['Uno', 'Dos']
  const [userInfo, setUserInfo] = useState()

  const getUsersInfo = async () => {
    const json = fetch('http://localhost:3001/user', {
      method: 'GET',
    }).then((res) => res.json())
    console.log(json)
    setUserInfo(json)
    console.log(userInfo)
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
          <h1 className="titulos">Categorías</h1>
          <h1 className="titulos">Estado</h1>
        </div>
        <div className="usersmanaged">
          <h3 className="titulos">{nombre}</h3>
          <h3 className="titulos">{usuario}</h3>
          <h3 className="titulos">{categorias}</h3>
          <div className="imagen">
            <img className="mgtimage" src={Active} alt="active" onClick={() => alert('hi')} />
          </div>
          <div className="trash-container">
            <img className="mgtimage" src={Trash} alt="trash" onClick={() => alert('Delete')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMgt
