/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
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
 */
const SearchbarTo = ({ setAccounts, setCategories }) => {
  const refInput = useRef()
  const [results, setResults] = useState({showTypes: false, showUsernames: false, actualSearch: undefined})
  const [sendToAccount, setSendToAccount] = useState([])
  const [sendToCategory, setSendToCategory] = useState([])
  const [actualSendersAccount, setActualSendersAccount] = useState([])
  const [actualSendersCategory, setActualSendersCategory] = useState([])

  const handleChange = (event) => {
    setResults({[event.target.name] : event.target.value})
  } 

  const searchCategories = () => {
    refInput.current.value = ""
    setResults({showTypes: !results.showTypes })
  }

  const selectInput = () => {
    refInput.current.focus()
  }

  useEffect(() => {
    refInput.current.value = ""
    const temporal = [...actualSendersAccount, ...sendToAccount]
    setActualSendersAccount([...new Set(temporal)])
    setAccounts([...new Set(temporal)])
  }, [sendToAccount])

  useEffect(() => {
    refInput.current.value = ""
    const temporal = [...actualSendersCategory, ...sendToCategory]
    setActualSendersCategory([...new Set(temporal)])
    setCategories([...new Set(temporal)])
  }, [sendToCategory])

  return (
    <div className="searchbarTo" onClick={selectInput}>
      <div className="searchBarElements">
        <div id="typeableArea">

          <Tags showTags={actualSendersCategory} isClosable setTags={setSendToCategory} />
          <Tags showTags={actualSendersAccount} isClosable setTags={setSendToAccount} />
  
          <input ref={refInput} type="text" role="input" name="actualSearch" onChange={handleChange} />
        </div>

        <Button id="searchCategories" name="&#xF2B9;" onClick={() => {searchCategories()}} />
      </div>

      {results.showTypes ? <List showTypes setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }
      {results.showUsernames ? <List showTypes setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }
      {results.actualSearch ? <List actualSearch={results.actualSearch} setTagsAccount={setSendToAccount} setTagsCategory={setSendToCategory} /> : '' }

    </div>
  )
}

SearchbarTo.propTypes = {
  setAccounts: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
}


export default SearchbarTo
