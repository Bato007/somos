/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import apiURL from '../fetch'
import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import SearchbarTo from '../SearchbarTo/SearchbarTo'

import iglesia from '../../static/imagesCreateAccount/logoSomos.png'
import pre from '../../static/imagesCreateAccount/pre.png'
import post from '../../static/imagesCreateAccount/post.png'
import back from '../../static/imagesCreateAccount/home2.png'
import './Create.css'

/* Form para ingresar campos */
const Create = () => {
  const history = useHistory()

  const [info, setInfo] = useState(0)
  /* Campos de ingreso */
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [conf, setConf] = useState('')
  const [categories, setCategories] = useState([])
  const [mail, setMail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [job, setJob] = useState('')
  const [place, setPlace] = useState('')
  const [church, setChurch] = useState('')

  const [error, setError] = useState('')

  const validarClave = (prueba) => {
    const largo = prueba.length
    if (largo < 8 || largo > 16) {
      return false
    } if (!/[a-z]/.test(prueba)) {
      return false
    } if (!/[A-Z]/.test(prueba)) {
      return false
    } if (!/[0-9]/.test(prueba)) {
      return false
    } if (!/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(prueba)) {
      return false
    }
    return true
  }

  const emailRequirements = (inemail) => {
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(inemail)) {
      return true
    }
    return false
  }

  const checkBasic = () => {
    if (user === '') {
      setError('No se ingresó usuario')
      return
    } if (pass === '') {
      setError('No se ingresó contraseña')
      return
    } if (conf === '') {
      setError('No se ingresó confirmación')
      return
    } if (pass !== conf) {
      setError('Las contraseñas no coinciden')
      return
    } if (categories.length === 0) {
      setError('No se han seleccionado categorías')
      return
    } if (!validarClave(pass)) {
      setError('La contraseña no cumple con las condiciones')
      return
    }
    setError('')
    setInfo(1)
  }

  const checkExtra = () => {
    if (mail === '') {
      setError('No se ingreso correo')
      return
    } if (name === '') {
      setError('No se ingreso nombre')
      return
    } if (phone !== '' && phone.length !== 8) {
      setError('El telefono ingresado no es valido')
      return
    } if (!emailRequirements(mail)) {
      setError('El correo ingresado no es valido')
      return
    }
    setError('')
    setInfo(2)
  }

  const showData = () => {
    /* Validacion de campos vacios */
    if (place === '') {
      setError('No se pueden dejar campos vacios')
    } else {
    /* Fetch para la creacion de la cuenta */
      const buffer = {
        username: user,
        password: pass,
        confirm: conf,
        email: mail,
        name,
        phone,
        workplace: job,
        residence: place,
        church,
        categories,
      }

      const bufferArray = Object.entries(buffer).filter(([key, value]) => value !== '')

      const data = Object.fromEntries(bufferArray)

      fetch(`${apiURL}/authentication/admin/signup`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setInfo(3)
          }
          return (res.json())
        })
        .catch((e) => console.error('Error', e))
        .then((out) => {
          console.log(out)
        })
    }
  }

  const checkedInfo = () => {
    switch (info) {
      case 1:
        return (
          <div className="containerC">
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de cuenta </p>
            </div>
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de usuario</p>
            </div>
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de ubicación</p>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="containerC">
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de cuenta </p>
            </div>
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de usuario</p>
            </div>
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de ubicación</p>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="containerC">
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de cuenta </p>
            </div>
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de usuario</p>
            </div>
            <div className="containerText">
              <img src={post} alt="post" width="25px" />
              <p>Información de ubicación</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="containerC">
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de cuenta </p>
            </div>
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de usuario</p>
            </div>
            <div className="containerText">
              <img src={pre} alt="pre" width="25px" />
              <p>Información de ubicación</p>
            </div>
          </div>
        )
    }
  }

  const askedInfo = () => {
    switch (info) {
      case 1:
        return (
          <div className="right">
            <div className="titulo">Agregar información</div>
            <h2>
              Llena este apartado por si en algún momento
              se llega a olvidar la contraseña o el usuario.
            </h2>
            <center>
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Dirección de email</h3>
              </div>
              <Input value={mail} className="InputCreate" type="text" name="email" placeholder="Correo electrónico" onChange={(event) => setMail(event.target.value)} />
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Nombre</h3>
              </div>
              <Input value={name} className="InputCreate" type="text" name="nombre" placeholder="Nombre completo" onChange={(event) => setName(event.target.value)} />
              <h3>Número telefónico</h3>
              <Input value={phone} className="InputCreate" type="number" name="teléfono" placeholder="Teléfono" onChange={(event) => setPhone(event.target.value.toString())} />
              <center>
                <Button id="Create" name="←  Regresar" onClick={() => setInfo(0)} />
                <Button id="Create" name="Continuar→" onClick={checkExtra} />
              </center>
              <Error error={error} />
            </center>
          </div>
        )
      case 2:
        return (
          <div className="right">
            <div className="titulo">Información personal</div>
            <h2>
              La información proporcionada no será compartida,
              únicamente estará disponible para el personal autorizado de SOMOS.
            </h2>
            <center>
              <h3>Lugar de trabajo</h3>
              <Input value={job} className="InputCreate" type="text" name="Trabajo" placeholder="Dirección de trabajo" onChange={(event) => setJob(event.target.value)} />
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Área de residencia</h3>
              </div>
              <Input value={place} className="InputCreate" type="text" name="Residencia" placeholder="Residencia" onChange={(event) => setPlace(event.target.value)} />
              <h3>Iglesia asociada</h3>
              <Input value={church} className="InputCreate" type="text" name="Iglesia" placeholder="Iglesia asociada" onChange={(event) => setChurch(event.target.value)} />
              <center>
                <Button id="Create" name="←  Regresar" onClick={() => setInfo(1)} />
                <Button id="Create" name="Crear" onClick={showData} />
              </center>
              <Error error={error} />
            </center>
          </div>
        )
      case 3:
        return (
          <div className="right">
            <div className="titulo2">
              La cuenta ha sido creada con éxito
            </div>
            <center>
              <Button id="Create" name="Inicio" onClick={() => history.push('/admin')} />
              <Button id="Create" name="Crear otra" onClick={() => history.go(0)} />
            </center>
          </div>
        )
      default:
        return (
          <div className="right">
            <div className="titulo">Crear cuenta</div>
            <h2>
              Empieza creando estos datos los cuales  ayudarán a poder
              acceder a la cuenta.
            </h2>
            <div className="required_con">
              <h3 className="required_indicator">* </h3>
              <h3>Usuario</h3>
            </div>
            <center>
              <Input value={user} className="InputCreate" type="text" name="username" placeholder="Usuario" onChange={(event) => setUser(event.target.value)} />
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Contraseña</h3>
              </div>
              <Input value={pass} className="InputCreate" type="password" name="password" placeholder="Introduzca su contraseña" onChange={(event) => setPass(event.target.value)} />
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Confirmación de contraseña</h3>
              </div>
              <Input value={conf} className="InputCreate" type="password" name="password" placeholder="Confirme su contraseña" onChange={(event) => setConf(event.target.value)} />
              <div className="required_con">
                <h3 className="required_indicator">* </h3>
                <h3>Categoría perteneciente</h3>
              </div>
              <SearchbarTo setCategories={setCategories} creatingAccount lastResult={categories} />
              <div className="oneBtn containerText botonesCA">
                <Button id="Create" name="Continuar →" onClick={checkBasic} />
              </div>
              <Error error={error} />
            </center>
          </div>
        )
    }
  }

  return (
    <div id="info">
      <div className="division">
        <div className="left">
          <img src={back} alt="back" width="60px" className="back" onClick={() => history.push('../home')} />
          {checkedInfo()}
          <img src={iglesia} alt="iglesia somos" className="church" width="170px" />
        </div>
        {askedInfo()}
      </div>
    </div>
  )
}

export default Create
