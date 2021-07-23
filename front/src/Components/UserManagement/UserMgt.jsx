import React from 'react'
import NavBar from '../NavBar/NavBar'

import './UserMgt.css'

const UserMgt = () => {
  /* Fetch de los datos de los usuarios */
  const nombre = 'Brandon'
  const usuario = 'bato'
  const categorias = ['Uno', 'Dos']
  const estado = 't'

  return (
    <div className="page-container">
      <NavBar />
      <div className="managementbkgr">
        <div className="management">
          <h1 className="nombre">Nombre</h1>
          <h1 className="usuario">Usuario</h1>
          <h1 className="categorias">Categorías</h1>
          <h1 className="estado">Estado</h1>
        </div>
        <div className="usersmanaged">
          <h3 className="nombre">{nombre}</h3>
          <h3 className="usuario">{usuario}</h3>
          <h3 className="categorias">{categorias}</h3>
          <h3 className="estado">{estado}</h3>
        </div>
      </div>
    </div>
  )
}

export default UserMgt
