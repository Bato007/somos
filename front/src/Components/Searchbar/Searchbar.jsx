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

  // Mostramos todos los recursos
  useEffect(() => {
    console.log(availableResources)
    setActualResults(availableResources)
  }, [])

  // Funcion onClick para mostrar solo en base a la busqueda actual
  // Si la busqueda es vacia, se muestran todos los recursos
  const searchResults = () => {
    const temporal = []
  
    if (actualSearch !== '') {
      for (let i=0; i<availableResources.length; i++) {
        const title = availableResources[i].title.toLowerCase()
        if (title.includes(actualSearch.toLowerCase())) {
          temporal.push(availableResources[i])
        }
      }
      setActualResults(temporal)
    } else {
      console.log(availableResources)
      setActualResults(availableResources)
    }
  }

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setActualSearch(event.target.value)
  }

  return (
    <div id="ActualResults">
      <div id="Searchbar">
        <Input className="searchbar" type="text" name="Searchbar" placeholder="Buscar..." onChange={handleChange} />
        <Button id="searchbarButton" onClick={searchResults} />
      </div>
    
      <ResourcePreview availableResources={actualResults} />
    </div>
  )
}

Searchbar.propTypes = {
  availableResources: PropTypes.arrayOf(
    PropTypes.shape({title: PropTypes.string.isRequired, resource: PropTypes.string.isRequired})
  ).isRequired,
  search: PropTypes.string,
}

Searchbar.defaultProps = {
  search: '',
}

export default Searchbar
