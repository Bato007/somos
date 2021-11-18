/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import swal from 'sweetalert'
import Button from '../Button/Button'
import Input from '../Input/Input'
import apiURL from '../fetch'
import SearchBarTo from '../SearchbarTo/SearchbarTo'
import '../Upload/Upload.css'

const EditResource = ({ resourceId }) => {
  const [categories, setCategories] = useState([])
  const [lastResult, setLastResult] = useState([])
  const [accountsUsernames, setAccountUsernames] = useState([])
  const [similarTo, setSimilarTo] = useState([])
  const [resourceInfo, setResourceInfo] = useState({
    filename: '', title: '', date: '', description: '', similarTo: [],
  })

  const getResourceInfo = async () => {
    const json = await fetch(`${apiURL}/resources/${resourceId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())

    try {
      setResourceInfo({
        filename: json.filename,
        title: json.title,
        date: json.available,
        description: json.description,
        similarTo: json.tags,
      })

      setLastResult(json.categories.concat(json.users))

      setCategories(json.categories)
      setAccountUsernames(json.users)
    } catch (e) {
      //
    }
  }

  useEffect(() => {
    getResourceInfo()
  }, [])

  const editResource = async () => {
    await fetch(`${apiURL}/admin/resources`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
      body: JSON.stringify({
        filename: resourceInfo.filename,
        id: resourceId,
        title: resourceInfo.title,
        description: resourceInfo.description,
        tags: similarTo,
        category: categories,
        users: accountsUsernames,
        date: resourceInfo.date,
      }),
    }).then((res) => {
      if (res.status === 200) {
        swal({
          title: 'El recurso ha sido actualizado con éxito',
          icon: 'success',
        }).then(() => {
          window.location.reload(true)
        })
      } else {
        swal({
          title: 'Oops! Algo ha fallado, por favor intenta más tarde',
          icon: 'error',
        }).then(() => {
          window.location.reload(true)
        })
      }
    })
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setResourceInfo({
      ...resourceInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div id="Upload">
      <h1>
        Editar Recurso
      </h1>
      <h3>
        <span className="obligatory">* </span>
        Título
      </h3>
      <Input className="titleInput" type="text" name="title" placeholder="Nombre del archivo" value={resourceInfo.title} onChange={handleChange} />
      <h3>
        <span className="obligatory">* </span>
        Para
      </h3>
      <SearchBarTo
        setAccounts={setAccountUsernames}
        lastResult={lastResult}
        setCategories={setCategories}
      />
      <h3>
        <span className="obligatory">* </span>
        Descripción del archivo
      </h3>
      <textarea name="description" value={resourceInfo.description} onChange={handleChange} />
      <h3>
        <span className="obligatory">* </span>
        Similar a
      </h3>
      <SearchBarTo
        showSimilarTo
        lastResult={resourceInfo.similarTo}
        setSimilarTo={setSimilarTo}
      />
      <h3>
        <span className="obligatory">* </span>
        Disponible hasta
      </h3>
      <div className="UploadEnd">
        <Input value={resourceInfo.date} className="titleInput" type="date" name="date" placeholder="Fecha de vigencia" onChange={handleChange} />
        <Button name="Aceptar" id="UploadButton" onClick={() => editResource()} />
      </div>
    </div>
  )
}

EditResource.propTypes = {
  resourceId: PropTypes.string.isRequired,
}

export default EditResource
