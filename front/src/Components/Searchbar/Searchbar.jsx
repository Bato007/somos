/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ResourcePreview from '../ResourcePreview/ResourcePreview'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './Searchbar.css'

/**
 * Searchbar para buscar recuros:
 *  Recibe los recursos a mostrar en formato [{title: '', resource: file}, ...]
 */
const Searchbar = ({ availableResources }) => {
  const [actualResults, setActualResults] = useState([])
  const [actualSearch, setActualSearch] = useState('')
  const [thereAreResources, setThereAreResources] = useState(true)

  // Mostramos todos los recursos
  useEffect(() => {
    setActualResults(availableResources)

    try {
      if (availableResources[0].message === 'No se encontro') {
        setThereAreResources(false)
      }
    } catch {
      setThereAreResources(false)
    }
  }, [])

  // Funcion onClick para mostrar solo en base a la busqueda actual
  // Si la busqueda es vacia, se muestran todos los recursos
  const searchResults = () => {
    const temporal = []

    if (actualSearch !== '') {
      for (let i = 0; i < availableResources.length; i += 1) {
        const title = availableResources[i].title.toLowerCase()
        if (title.includes(actualSearch.toLowerCase())) {
          temporal.push(availableResources[i])
        }
      }
      setActualResults(temporal)
    } else {
      setActualResults(availableResources)
    }
  }

  // Funcion para saber si el usuario hizo enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchResults()
    }
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setActualSearch(event.target.value)
  }

  return (
    thereAreResources ? (
      <div id="ActualResults">
        <div id="Searchbar" onKeyDown={handleKeyDown}>
          <Input
            className="searchbar"
            type="text"
            name="Searchbar"
            placeholder="Buscar..."
            onChange={handleChange}
          />
          <Button id="searchbarButton" onClick={searchResults} />
        </div>

        <ResourcePreview availableResources={actualResults} />
      </div>
    )
      : ''
  )
}

Searchbar.propTypes = {
  availableResources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string, resource: PropTypes.string, message: PropTypes.string,
    }),
  ).isRequired,
}

export default Searchbar
