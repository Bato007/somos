import React, { useState } from 'react'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import NavBar from '../NavBar/NavBar'
import SearchBarTo from '../SearchbarTo/SearchbarTo'
import './Upload.css'

/**
 * Obteniendo la fecha actual para las dates disponibles en el recurso
 */
const date = () => {
  const today = new Date()
  const month = today.getMonth()+1

  if (month.toString().length === 1){
      return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
  } else {
      return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }
}

const actualDate = date()

const Upload = () => {
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [accountsUsernames, setAccountUsernames] = useState([])
  const [resourceInfo, setResourceInfo] = useState({CargarArchivo: 'Cargar Archivo', title: '', date:'', description: '', similarTo: []})

  // Leyendo el valor actual del file
  const handleSelectedFile = (event) => {
    if (event.target.value === '') {
      setResourceInfo({
        ...resourceInfo,
        CargarArchivo: 'Cargar Archivo'
      })
    } else {
      setResourceInfo({
        ...resourceInfo,
        CargarArchivo: event.target.value
      })
    }
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setResourceInfo({
      ...resourceInfo,
      [event.target.name] : event.target.value
    })
  }

  const submitResource = async () => {
    const title = resourceInfo.title
    const description = resourceInfo.description
    const tags = ['']
    const category = categories
    const users = accountsUsernames
    const date = resourceInfo.date

    if (title === 'Cargar Archivo' || description === '' || date === '' || (category.length === 0 && users.length === 0)) {
      setError('Por favor, llena todos los campos')
    } else {
      setError('')
      await fetch('http://localhost:3001/authentication/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, tags, category, users, date}),
      }).then((res) => res.json())
    }
  }

  return (
    <div className="Upload">
      <NavBar />
      <div id="Upload">      
        <h1>Subir recurso</h1>
        <div className="ChooseFile">
          {resourceInfo.CargarArchivo}
          <Input className="InputFile" name="CargarArchivo" type="file" onChange={handleSelectedFile} />
        </div>
        <h3>Titulo</h3>
        <Input className="titleInput" type="text" name="title" placeholder="Nombre del archivo" onChange={handleChange} />
        <h3>Para</h3>
        <SearchBarTo setAccounts={setAccountUsernames} setCategories={setCategories} />
        <h3>Descripcion del archivo</h3>
        <textarea name="description" onChange={handleChange} />
        <h3>Disponible hasta</h3>
        <div className="UploadEnd">          
          <Input className="titleInput" type="date"  min={actualDate} name="date" placeholder="Fecha de vigencia" onChange={handleChange} />
          <Button name="Subir" id="UploadButton" onClick={submitResource} />
        </div>
        <Error error={error} />
      </div>
    </div>
  )
}

export default Upload