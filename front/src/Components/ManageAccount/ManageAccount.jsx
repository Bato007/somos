import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import SearchBarTo from '../SearchbarTo/SearchbarTo'

const ManageAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: '', email: '', tel: '', password: '', confirmPassword: '', address: '', categories: '',
  })
  const [categories, setCategories] = useState([])
  // Leyendo el valor actual de los field
  const handleManageAccount = (event) => {
    setAccountInfo({
      ...accountInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div id="ManageAccount">
      <div className="ManageAccountContainer">
        <h1 className="title">Actualización de cuenta</h1>
        <div className="ManageAccount">
          <div className="manageAccountBox">
            <h1>Usuario</h1>
            <Input name="username" type="text" onChange={handleManageAccount} />
          </div>

          <div className="manageAccountBox">
            <h1>Email</h1>
            <Input name="email" type="text" onChange={handleManageAccount} />
          </div>

          <div className="manageAccountBox">
            <h1>Contraseña</h1>
            <Input name="password" type="password" onChange={handleManageAccount} />
          </div>

          <div className="manageAccountBox">
            <h1>Confirmar contraseña</h1>
            <Input name="confirmPassword" type="password" onChange={handleManageAccount} />
          </div>

          <div className="manageAccountBox">
            <h1>Numero de Celular</h1>
            <Input name="tel" type="text" onChange={handleManageAccount} />
          </div>

          <div className="manageAccountBox">
            <h1>Lugar de residencia</h1>
            <Input name="address" type="text" onChange={handleManageAccount} />
          </div>
        </div>
        <h1>Categorías</h1>
        <SearchBarTo setCategories={setCategories} creatingAccount lastResult={categories} />

        <div className="ButtonOptions">
          <Button name="Cancelar" id="CancelButton" />
          <Button name="Guardar" id="UploadButton" />
        </div>
      </div>
    </div>
  )
}

export default ManageAccount
