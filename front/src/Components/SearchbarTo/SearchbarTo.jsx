/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
import List from '../List/List'
import Button from '../Button/Button'
import Tags from '../Tags/Tags'
import './SearchbarTo.css'

const SearchbarTo = () => {
  const refInput = useRef()
  const [results, setResults] = useState({showTypes: false, showUsernames: false, actualSearch: undefined})
  const [sendTo, setSendTo] = useState([])
  const [actualSenders, setActualSenders] = useState([])

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
    const temporal = [...actualSenders, ...sendTo]
    setActualSenders([...new Set(temporal)])
  }, [sendTo])

  return (
    <div className="searchbarTo" onClick={selectInput}>
      <div className="searchBarElements">
        <div id="typeableArea">
          <Tags showTags={actualSenders} isClosable />
          <input ref={refInput} type="text" name="actualSearch" onChange={handleChange} />
        </div>
        <Button id="searchCategories" name="&#xF2B9;" onClick={() => {searchCategories()}} />
      </div>

      {results.showTypes ? <List showTypes setTags={setSendTo} /> : '' }
      {results.showUsernames ? <List showTypes setTags={setSendTo} /> : '' }
      {results.actualSearch ? <List actualSearch={results.actualSearch} setTags={setSendTo} /> : '' }

    </div>
  )
}

export default SearchbarTo
