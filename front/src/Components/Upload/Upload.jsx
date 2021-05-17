import React from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import SearchBarTo from '../SearchbarTo/SearchbarTo'
import './Upload.css'

const Upload = () => {
  const HandleChange = () => {

  }

  return (
    <div className="Upload">
      <div id="Upload">      
        <h1>Subir recurso</h1>
        <Button name="Cargar archivo" id="ChooseFile" />
        <h3>Titulo</h3>
        <Input className="titleInput" type="text" name="title" placeholder="Nombre del archivo" />
        <h3>Para</h3>
        <SearchBarTo />
        <h3>Descripcion del archivo</h3>
        <textarea name="description" rows="8" cols="90"></textarea>
        <h3>Fecha limite de disponibilidad</h3>
        <div className="UploadEnd">          
          <Input type="date" name="date" placeholder="Fecha de vigencia" />
          <Button name="Subir" id="UploadButton" />
        </div>
      </div>
    </div>
  )
}

export default Upload