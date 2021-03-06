import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Swal from 'sweetalert2'
import swal from 'sweetalert'
import withReactContent from 'sweetalert2-react-content'
import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import SearchBarTo from '../SearchbarTo/SearchbarTo'
import apiURL from '../fetch'
import bucket from './bucket'
import './Upload.css'

const formData = new FormData()

const Upload = () => {
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [accountsUsernames, setAccountUsernames] = useState([])
  const [similarTo, setSimilarTo] = useState([])
  const [resourceInfo, setResourceInfo] = useState({
    CargarArchivo: 'Cargar Archivo', file: '', title: '', date: '', description: '', similarTo: [],
  })
  const history = useHistory()
  const MySwal = withReactContent(Swal)

  // Leyendo el valor actual del file
  const handleSelectedFile = (event) => {
    if (event.target.value === '') {
      setResourceInfo({
        ...resourceInfo,
        CargarArchivo: 'Cargar Archivo',
      })
      formData.delete('resource')
    } else {
      setResourceInfo({
        ...resourceInfo,
        CargarArchivo: event.target.files[0].name,
        file: event.target.files[0],
      })
      formData.set('resource', event.target.files[0])
    }
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setResourceInfo({
      ...resourceInfo,
      [event.target.name]: event.target.value,
    })
  }

  const submitResource = async () => {
    const upload = resourceInfo.file
    const { title } = resourceInfo
    const { description } = resourceInfo
    const tags = similarTo
    const category = categories
    const users = accountsUsernames
    const fecha = resourceInfo.date
    const filename = upload.name
    let status

    if (upload === 'Cargar Archivo' || !upload) {
      swal({
        title: 'Oops! Hace falta carga el archivo',
        icon: 'warning',
      })
    } else if (title === '' || description === '' || fecha === '' || (category.length === 0 && users.length === 0)) {
      setError('Por favor, llena todos los campos')
    } else {
      setError('')

      MySwal.fire({
        title: <p>Tu archivo est?? siendo procesado...</p>,
        didOpen: () => {
          MySwal.showLoading()
        },
        allowOutsideClick: false,
      })

      bucket.ref(`/${filename}`).put(upload)
        .on('state_change', null, () => {
          MySwal.close()
          swal({
            title: 'Tu archivo no se ha podido subir',
            icon: 'error',
          })
        }, async () => {
          await fetch(`${apiURL}/admin/resources`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              somoskey: `${localStorage.getItem('somoskey')}`,
            },
            body: JSON.stringify({
              filename, title, description, tags, category, users, date: fecha,
            }),
          }).then((res) => {
            status = res.status
            if (status === 200) {
              MySwal.close()
              swal({
                title: 'Tu archivo se ha cargado con ??xito',
                icon: 'success',
              }).then(() => {
                history.goBack()
              })
            } else {
              swal({
                title: 'Tu archivo no se ha podido subir',
                icon: 'error',
              })
            }
          })
        })
    }
  }

  return (
    <div className="Upload">
      <div id="Upload">
        <h1>
          Subir recurso
        </h1>
        <div className="ChooseFile">
          {resourceInfo.CargarArchivo}
          <Input className="InputFile" name="CargarArchivo" type="file" onChange={handleSelectedFile} />
        </div>
        <h3>
          <span className="obligatory">* </span>
          T??tulo
        </h3>
        <Input className="titleInput" type="text" name="title" placeholder="Nombre del archivo" onChange={handleChange} />
        <h3>
          <span className="obligatory">* </span>
          Para
        </h3>
        <SearchBarTo setAccounts={setAccountUsernames} setCategories={setCategories} />
        <h3>
          <span className="obligatory">* </span>
          Descripci??n del archivo
        </h3>
        <textarea name="description" onChange={handleChange} />
        <h3>
          <span className="obligatory">* </span>
          Similar a
        </h3>
        <SearchBarTo showSimilarTo setSimilarTo={setSimilarTo} />
        <h3>
          <span className="obligatory">* </span>
          Disponible hasta
        </h3>
        <div className="UploadEnd">
          <Input className="titleInput" type="date" name="date" placeholder="Fecha de vigencia" onChange={handleChange} />
          <Button name="Subir" id="UploadButton" onClick={submitResource} />
        </div>
        <Error error={error} />
      </div>
    </div>
  )
}

export default Upload
