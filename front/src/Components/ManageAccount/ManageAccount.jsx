import React, { useState, useEffect } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import SearchBarTo from '../SearchbarTo/SearchbarTo'

import apiURL from '../fetch'

const ManageAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: '', email: '', tel: '', password: '', confirmPassword: '', address: '', categories: [],
  })
  // eslint-disable-next-line no-unused-vars
  const [categories, setCategories] = useState([])

  // Se obtiene la info del usuario y se coloca en el estado
  const getUserInfo = async () => {
    const userInfo = await fetch(`${apiURL}/user/${localStorage.getItem('username')}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())
    if (!userInfo.tel) { userInfo.tel = '' }
    console.log(userInfo)
    setAccountInfo({
      ...userInfo,
      password: '',
      confirmPassword: '',
    })
  }

  const saveChanges = async () => {
    const {
      username, email, tel, password, confirmPassword, address,
    } = accountInfo
    const buffer = {
      username,
      email,
      password,
      confirm: confirmPassword,
      phone: tel,
      residence: address,
      categories,
    }

    // eslint-disable-next-line no-unused-vars
    const bufferArray = Object.entries(buffer).filter(([key, value]) => value !== '')

    const data = Object.fromEntries(bufferArray)
    /**
     * response code = 400
     * ERROR 100 missing required fields || password required
     * ERROR 101 invalid email || phone must be an integer
     * ERROR 102 user needs category
     * ERROR 105 invalid password
     * ERROR 106 different passwords
     * ERROR 107 invalid country
     */
    const response = await fetch(`${apiURL}/user/information`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}` },
      }).then((res) => res.json()).then((res) => (res))
      .catch((e) => console.error('Error', e))
    console.log(response)
  }

  // Leyendo el valor actual de los field
  const handleManageAccount = (event) => {
    setAccountInfo({
      ...accountInfo,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <div id="ManageAccount">
        <div className="ManageAccountContainer">
          <h1 className="title">Actualización de cuenta</h1>
          <div className="ManageAccount">
            <div className="manageAccountBox">
              <h1>Usuario</h1>
              <Input name="username" type="text" value={accountInfo.username} readOnly />
            </div>

            <div className="manageAccountBox">
              <h1>Email</h1>
              <Input name="email" type="text" value={accountInfo.email} onChange={handleManageAccount} />
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
              <Input name="tel" type="text" value={accountInfo.tel} onChange={handleManageAccount} />
            </div>

            <div className="manageAccountBox">
              <h1>Lugar de residencia</h1>
              <Input name="address" type="text" value={accountInfo.address} onChange={handleManageAccount} />
            </div>
          </div>
          <h1>Categorías</h1>

          { accountInfo.categories.length > 0
            ? (
              <SearchBarTo
                setCategories={setCategories}
                creatingAccount
                lastResult={accountInfo.categories}
              />
            )
            : ''}

          <div className="ButtonOptions">
            <Button name="Cancelar" id="CancelButton" onClick={() => getUserInfo()} />
            <Button name="Guardar" id="UploadButton" onClick={() => saveChanges()} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageAccount
