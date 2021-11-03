/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Input from '../Input/Input'
import Button from '../Button/Button'
import apiURL from '../fetch'
import './serviceProvider.css'

const serviceProvider = () => {
  const history = useHistory()
  const [serviceInfo, setServiceInfo] = useState({
    title: '', description: '', email: '', date: '', phone: '', contact: '',
  })

  const postAnnouncement = async () => {
    const buffer = {
      title: serviceInfo.title,
      description: serviceInfo.description,
      contact: serviceInfo.contact,
      email: serviceInfo.email,
      phone: serviceInfo.phone,
      date: serviceInfo.date,
    }

    const bufferArray = Object.entries(buffer).filter(([_, value]) => value !== '')
    const data = Object.fromEntries(bufferArray)

    // response = [statuscode, message] ejmplo: [200, undefined] o [400, 'error']
    const response = await fetch(`${apiURL}/announcements/help`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => [res.status, res.message])
      .catch((error) => { console.log(error) })

    // Se realiza la logica para los errores
    if (response[0] === 200) {
      // Mostrar mensaje de exito
      history.replace('/')
    } else if (response[0] === 500) {
      // Mostrar mensaje de error insesperado
    } else { // Es error 400
      // Posibles errores:
      // ERROR 100 missing required fields || empty required field
      // ERROR 101 invalid email || phone must be an integer
      // ERROR 102 invalid phone number
      // ERROR 103 invalid size for title or description at least 10
      // ERROR 104 invalid date must be 'MM-DD-YYYY'
      // ERROR 105: Email or phone required

      const result = response?.message
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
            title: 'Oops! Tu número de celular parece ser inválido',
            icon: 'warning',
            buttons: ['Aceptar'],
          })
        } else if (result.includes('103')) {
          swal({
            title: 'Oops! La descripción/título deben de tener al menos 10 caractéres',
            icon: 'warning',
            buttons: ['Aceptar'],
          })
        } else if (result.includes('104')) {
          swal({
            title: 'Oops! La fecha pareciera ser inválida',
            text: 'Revisa que sea formato MM-DD-YYYY',
            icon: 'warning',
            buttons: ['Aceptar'],
          })
        } else if (result.includes('105')) {
          swal({
            title: 'Oops! Es necesario que ingreses número de celular o correo electrónico',
            icon: 'error',
            buttons: ['Aceptar'],
          })
        }
      } else {
        swal({
          title: '¡Tu anuncio se ha mandado a revisión con éxito!',
          text: 'Te agradecemos por tu servicio. Se te informará cuando este sea aceptado',
          icon: 'success',
        }).then((res) => {
          if (res) {
            const path = window.location.href.split('/')[3]
            history.push(`/${path}`)
          }
        })
      }
    }
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setServiceInfo({
      ...serviceInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="service">
      <div id="service">
        <h1>¿Qué servicio le gustaría brindar?</h1>
        <div className="inputServiceProvider">
          <p>
            <span className="obligatory">* </span>
            Título
          </p>
          <Input name="title" type="text" placeholder="Servicio a brindar" onChange={handleChange} />
        </div>
        <div className="inputServiceProvider">
          <p>
            <span className="obligatory">* </span>
            Descripción
          </p>
          <textarea name="description" onChange={handleChange} />
        </div>
        <div className="inputServiceProvider">
          <p>
            <span className="obligatory">* </span>
            Información de contacto
          </p>
          <Input name="contact" type="text" placeholder="Nombre" onChange={handleChange} />
          <Input name="email" type="text" placeholder="Correo electrónico" onChange={handleChange} />
          <Input name="phone" type="text" placeholder="Número de celular" onChange={handleChange} />
        </div>
        <div className="inputServiceProvider">
          <p>
            <span className="obligatory">* </span>
            Último día para hacer uso de tu servicio
          </p>
          <Input className="titleInput" type="date" name="date" placeholder="Fecha de vigencia" onChange={handleChange} />
        </div>
        <div className="footerService">
          <div>
            <p>
              Se le avisará vía correo electrónico si el servicio es aprobado
              o denegado.
            </p>
            <p><strong>Gracias.</strong></p>
          </div>
          <Button id="SendRequest" name="Enviar solicitud" onClick={() => postAnnouncement()} />
        </div>
      </div>
    </div>
  )
}

export default serviceProvider
