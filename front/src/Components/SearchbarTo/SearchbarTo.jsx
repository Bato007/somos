/* eslint-disable max-len */
/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import List from '../List/List'
import Button from '../Button/Button'
import Tags from '../Tags/Tags'
import './SearchbarTo.css'

/**
 *
 * Searchbar para buscar usuarios o categorias
 * Donde setAccounts son las cuentas a las cuales se les activa el recurso
 *       setCategories son las categorias a las cuales se les activa el recurso
 *       setSimilarTo son las tags de similares a
 *       showSimilarTo es un bool: donde true muestra tags similares,
 *       false muestra contactos similares
 *       creatingAccount es un bool: donde true permite ingresar nuevas categorias al hacer enter
 *       lastResult: es la lista anterior: usada por si el usuario regresa a la pantalla,
 *       mostrar las categorias seleccionadas con anterioridad
 */
const SearchbarTo = ({
  setAccounts, setCategories, showSimilarTo, setSimilarTo, creatingAccount, lastResult,
}) => {
  const refInput = useRef()
  const [results, setResults] = useState({ showTypes: false, showUsernames: false, actualSearch: undefined })

  const [sendToAccount, setSendToAccount] = useState([])
  const [sendToCategory, setSendToCategory] = useState([])
  const [tagsSimilarTo, setTagsSimilarTo] = useState([])

  const [actualSendersAccount, setActualSendersAccount] = useState([])
  const [actualSendersCategory, setActualSendersCategory] = useState([])
  const [actualTagsSimilarTo, setActualTagsSimilarTo] = useState([])

  const handleChange = (event) => {
    setResults({ [event.target.name]: event.target.value.toLowerCase() })
  }

  // Funcion para saber si el usuario hizo enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && showSimilarTo) {
      setTagsSimilarTo([...tagsSimilarTo, event.target.value.toLowerCase()]) // tomamos el valor
      refInput.current.value = '' // Limpiamos el input
    } else if (event.key === 'Enter' && creatingAccount) {
      setSendToCategory([...tagsSimilarTo, event.target.value.toLowerCase()]) // tomamos el valor
      refInput.current.value = '' // Limpiamos el input
    }
  }

  // Funcion para saber si el usuario hizo click en el icono
  const searchCategories = () => {
    refInput.current.value = ''
    setResults({ showTypes: !results.showTypes })
  }

  // Funcion para saber si el usuario hizo click en el searchbar
  const selectInput = () => {
    refInput.current.focus()
  }

  // UseEffect para colocar tags de "similares a"
  useEffect(() => {
    if (setSimilarTo !== undefined) {
      refInput.current.value = ''
      const temporal = [...actualTagsSimilarTo, ...tagsSimilarTo]

      setActualTagsSimilarTo([...new Set(temporal)])
      setSimilarTo([...new Set(temporal)])
    }
  }, [tagsSimilarTo])

  // UseEffect para colocar tags de "cuentas"
  useEffect(() => {
    if (setAccounts !== undefined) {
      refInput.current.value = ''
      const temporal = [...actualSendersAccount, ...sendToAccount]
      setActualSendersAccount([...new Set(temporal)])
      setAccounts([...new Set(temporal)])
    }
  }, [sendToAccount])

  // UseEffect para colocar tags de "categorias"
  useEffect(() => {
    // Mostrar el resultado pasado
    console.log(lastResult)
    if (setCategories !== undefined) {
      refInput.current.value = ''
      const temporal = [...actualSendersCategory, ...sendToCategory]

      if (lastResult.length > 0 && temporal.length === 0) {
        setActualSendersCategory(lastResult)
        setCategories(lastResult)
      } else {
        setActualSendersCategory([...new Set(temporal)])
        setCategories([...new Set(temporal)])
      }
    }
  }, [sendToCategory])

  return (
    <div className="searchbarTo" onClick={selectInput}>
      <div className="searchBarElements">
        <div id="typeableArea" onKeyDown={handleKeyDown}>

          <Tags showTags={actualSendersCategory} isClosable setTags={setSendToCategory} />
          <Tags showTags={actualSendersAccount} isClosable setTags={setSendToAccount} />
          <Tags showTags={actualTagsSimilarTo} isClosable setTags={setTagsSimilarTo} />

          <input ref={refInput} type="text" role="input" name="actualSearch" onChange={handleChange} />
        </div>

        { showSimilarTo
          ? <Button id="searchCategories" name="&#xF103;" onClick={() => { searchCategories() }} />
          : <Button id="searchCategories" name="&#xF2B9;" onClick={() => { searchCategories() }} />}

      </div>

      {results.actualSearch && creatingAccount ? <List showTypes setTagsCategory={setSendToCategory} creatingAccount /> : '' }
      {results.showTypes && creatingAccount ? <List showTypes setTagsCategory={setSendToCategory} creatingAccount /> : '' }

      {results.showTypes && !creatingAccount && !showSimilarTo ? <List showTypes setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }
      {results.showUsernames && !creatingAccount && !showSimilarTo ? <List showTypes setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }
      {results.actualSearch && !creatingAccount && !showSimilarTo ? <List actualSearch={results.actualSearch} setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }

      {results.showTypes && !creatingAccount && showSimilarTo ? <List showSimilarTo setSimilarTo={setTagsSimilarTo} /> : ''}
      {results.actualSearch && !creatingAccount && showSimilarTo ? <List showSimilarTo setSimilarTo={setTagsSimilarTo} actualSearch={results.actualSearch} /> : ''}

    </div>
  )
}

SearchbarTo.propTypes = {
  setAccounts: PropTypes.func,
  setCategories: PropTypes.func,
  setSimilarTo: PropTypes.func,
  showSimilarTo: PropTypes.bool,
  creatingAccount: PropTypes.bool,
  lastResult: PropTypes.arrayOf(PropTypes.string),
}

SearchbarTo.defaultProps = {
  setAccounts: undefined,
  setCategories: undefined,
  setSimilarTo: () => {},
  showSimilarTo: false,
  creatingAccount: false,
  lastResult: [],
}

export default SearchbarTo
