import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Swal from 'sweetalert2'
import swal from 'sweetalert'
import withReactContent from 'sweetalert2-react-content'

import Input from '../Input/Input'
import Button from '../Button/Button'
import SearchBarTo from '../SearchbarTo/SearchbarTo'

import apiURL from '../fetch'

const ManageAccount = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: '', email: '', tel: '', password: '', confirmPassword: '', address: '', categories: [],
  })
  const [categories, setCategories] = useState([])
  const history = useHistory()
  const MySwal = withReactContent(Swal)

  // Se obtiene la info del usuario y se coloca en el estado
  const getUserInfo = async () => {
    const userInfo = await fetch(`${apiURL}/user/${localStorage.getItem('username')}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())
    if (!userInfo.tel) { userInfo.tel = '' }
    setAccountInfo({
      ...userInfo,
      password: '',
      confirmPassword: '',
    })
    setCategories(userInfo.categories)
  }

  const saveChanges = async () => {
    MySwal.fire({
      title: <p>Los cambios se están procesando...</p>,
      didOpen: () => {
        MySwal.showLoading()
      },
      allowOutsideClick: false,
    })

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
      }).then((res) => {
      if (res.status !== 200) {
        return res?.json()
      }
      return undefined
    }).then((res) => (res)).catch((e) => console.error('Error', e))

    const result = response?.message
    MySwal.close()
    if (result) {
      if (result.includes('100')) {
        swal({
          title: 'Por favor, termina de llenar todos los campos',
          icon: 'error',
          buttons: ['Aceptar'],
        })
      } else if (result.includes('101')) {
        swal({
          title: 'Por favor, revisa que el correo/celular sean válidos',
          icon: 'error',
          buttons: ['Aceptar'],
        })
      } else if (result.includes('102')) {
        swal({
          title: 'Oops! Necesitas al menos una categoría',
          icon: 'warning',
          buttons: ['Aceptar'],
        })
      } else if (result.includes('105')) {
        swal({
          title: 'Oops! Revisa que tu contraseña cumpla con los requisitos pedidos',
          text: 'La contraseña debe de tener un mínimo de 8 letras: un número, una letra minúscula, una letra mayúscula, un caracter especial',
          icon: 'warning',
          buttons: ['Aceptar'],
        })
      } else if (result.includes('106')) {
        swal({
          title: 'Oops! Tus contraseñas no coinciden',
          icon: 'error',
          buttons: ['Aceptar'],
        })
      } else if (result.includes('107')) {
        swal({
          title: 'Oops! Tu residencia no parece ser válida',
          icon: 'error',
          buttons: ['Aceptar'],
        })
      }
    } else {
      swal({
        title: '¡Tu cuenta se ha actualizado con exito!',
        icon: 'success',
      }).then((res) => {
        if (res) {
          const path = window.location.href.split('/')[3]
          history.push(`/${path}`)
        }
      })
    }
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
              <h1>Número de Celular</h1>
              <Input name="tel" type="text" value={accountInfo.tel} onChange={handleManageAccount} />
            </div>

            <div className="manageAccountBox">
              <h1>Lugar de residencia</h1>
              <Input name="address" type="text" value={accountInfo.address} onChange={handleManageAccount} />
            </div>
          </div>
          <h1>Categorías</h1>

          <SearchBarTo
            setCategories={setCategories}
            creatingAccount
            lastResult={categories}
          />

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
