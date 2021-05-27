/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './List.css'

/**
 * 
 * Donde actualSearch es la palabra buscada actualmente
 * showUsernames es un bool donde true retorna los miembros
 * showTypes es un bool donde true retorna las categorias
 * 
 * El retorno es un listado normal si es showUsernames o un listado
 * con boton si es showTypes, donde el boton muestra los miembros
 * 
 */

const List = ({ actualSearch, showUsernames, showTypes, setTagsAccount, setTagsCategory}) => {
  const refList = useRef()

  const [members, setMembers] = useState([])
  const [showRequired, setShowRequired] = useState([])
  const [lastResult, setLastResult] = useState([])
  const [showReturn, setReturn] = useState(false)
  const [sendResourceToAccount, setSendResourceToAccount] = useState([])
  const [sendResourceToCategory, setSendResourceToCategory] = useState([])
  let iteration = 0

  useEffect(() => {
    getMembers() //Requerido una sola vez 
  }, [])

  useEffect(() => {
    document.addEventListener('click', async (event) => {
      if (refList.current !== null) {
        let isClickInsideElement = await refList.current.contains(event.target)
        if (!isClickInsideElement && event.target.type !== 'button') {
          setShowRequired([])
          setReturn(false)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (showUsernames || showTypes) {
      getRequired(showUsernames, showTypes)
    } else {
      showSimilar(actualSearch)
    }
  }, [members])

  // Cada vez que cambie la busqueda
  useEffect(() => {
    if (actualSearch !== undefined) {
      showSimilar(actualSearch)
    }
  }, [actualSearch])

  // Funcion llamada para obtener la informacion de la base 
  const getMembers = () => {
    // Aqui iria el fetch para obtener los miembros inscritos
    // Es un diccionario miembro: tipo
    setMembers([{username: 'bato', type: ['church', 'somos']}, {username: 'andrea', type: ['mentor', 'somos']}])
  }

  // Funcion llamada para obtener el listado de personas o categorias
  const getRequired = (showUsernames, showTypes) => {
    const actualShow = []

    if (showUsernames) {     
      for (let i=0; i<members.length; i++) {
        actualShow.push(members[i].username) 
      }
    } else if (showTypes) {      
      for (let a=0; a<members.length; a++) {
        for (let i=0; i<members[a].type.length; i++) {
          actualShow.push(members[a].type[i]) 
        }
      }
    }
  
    // Eliminando posibles elementos repetidos
    saveLast([...new Set(actualShow)])
    setShowRequired([...new Set(actualShow)])
  }

  // Funcion llamada en onClick para mostrar los miembros de cierta categoria
  const showMembers = (actualType) => {
    const actualMembers = []
    iteration++

    for (let i=0; i<members.length; i++) {
      for (let a=0; a<members[i].type.length; a++) {
        if (members[i].type[a] === actualType) {
          actualMembers.push(members[i].username)
        } 
      }
    }

    setReturn(true)
    saveLast(actualMembers)
    setShowRequired(actualMembers)
  }

  // Funcion llamada al obtener una letra o palabra del searchbar y mostrar resultados similares
  const showSimilar = (actualSearch) => {
    const getSearch = []

    for (let i=0; i<members.length; i++) {
      for (let a=0; a<members[i].type.length; a++) {
        if ((members[i].type[a]).includes(actualSearch)) {
          getSearch.push(members[i].type[a])
        }
      }
      if ((members[i].username).includes(actualSearch)) {
        getSearch.push(members[i].username)
      }
    }

    saveLast([...new Set(getSearch)])
    setShowRequired([...new Set(getSearch)])
  }

  // Funcion llamada para saber si mostrar el boton de mas o no
  const showButton = (result) => {
    for (let i=0; i<members.length; i++) {
      for (let a=0; a<members[i].type.length; a++) {
        if ((members[i].type[a]).includes(result)) {
          return true
        }
      }
      if ((members[i].username).includes(result)) {
        return false
      }
    }
    return false
  }

  // Funcion para guardar el elemento anterior al mostrado actualmente
  // Solo se realiza una vez
  const saveLast = (actualResult) => {
    if (lastResult.length === 0 && iteration === 0) {
      setLastResult(actualResult)
    }
  }

  // Manda a llamar el resultado anterior
  // Funcion en onClick del boton regresar
  const showLast = () => {
    setShowRequired(lastResult)
    setReturn(false)
  }

  // Guarda la persona seleccionada
  const saveReference = (result) => {

    if (showButton(result)) {
      setSendResourceToCategory([...sendResourceToCategory, result])
      setTagsCategory([...sendResourceToCategory, result])
    } else {
      setSendResourceToAccount([...sendResourceToAccount, result])
      setTagsAccount([...sendResourceToAccount, result])
    }
  }

  return (
    <ul className="list" ref={refList}>
      { showReturn ? 
      <li id="return">
        <button type="button" onClick={() =>  showLast(showRequired)}>◀</button>
        <p>Regresar</p>
      </li> : ''}

      {showRequired.map((result) => (
        <li key={result}>
          <p onClick={() => saveReference(result)}>{result}</p>
          {showButton(result) ? <button type="button" onClick={() => showMembers(result)}>▶</button> : ''}
        </li>
      ))}
    </ul>
  )
}

List.propTypes = {
  actualSearch: PropTypes.string,
  showTypes: PropTypes.bool,
  showUsernames: PropTypes.bool,
  setTagsAccount: PropTypes.func,
  setTagsCategory: PropTypes.func,
}

List.defaultProptypes = {
  actualSearch: '',
  showTypes: false,
  showUsernames: false,
  setTagsAccount: () => {},
  setTagsCategory: () => {},
}

export default List
