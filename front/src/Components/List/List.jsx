/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './List.css'

/**
 *
 * Donde:
 * showUsernames es un bool donde true retorna los miembros
 * showTypes es un bool donde true retorna las categorias
 * showSimilarTo es un bool donde true retorna las etiquetas similares a
 *
 * setSimilarTo es una funcion donde se guardaran las etiquetas similares a
 * setTagsAccount es una funcion donde se guardaran los miembros
 * setTagsCategory es una funcion donde se guardaran las categorias
 *
 * actualSearch es la palabra buscada actualmente
 *
 * creatingAccount es un bool para saber si mostrar la flechita de miembros
 *
 * El retorno es un listado normal si es showUsernames o un listado
 * con boton si es showTypes, donde el boton muestra los miembros
 *
 */

const List = ({
  showUsernames, showTypes, showSimilarTo, setSimilarTo,
  setTagsAccount, setTagsCategory, actualSearch, creatingAccount,
}) => {
  const refList = useRef()

  const [members, setMembers] = useState([])
  const [tagsSimilarTo, setTagsSimilarTo] = useState([])

  const [showRequired, setShowRequired] = useState([])
  const [lastResult, setLastResult] = useState([])
  const [showReturn, setReturn] = useState(false)

  const [sendToTag, setSendToTag] = useState([])
  const [sendResourceToAccount, setSendResourceToAccount] = useState([])
  const [sendResourceToCategory, setSendResourceToCategory] = useState([])
  let iteration = 0

  // Funcion llamada para obtener la informacion de la base
  const getMembers = () => {
    // Aqui iria el fetch para obtener los miembros inscritos
    // Es un diccionario miembro: tipo
    setMembers([{ username: 'bato', type: ['church', 'somos'] }, { username: 'andrea', type: ['mentor', 'somos'] }])
  }

  // Funcion llamada para obtener la informacion de la base
  const getSimilarToTags = () => {
    // Aqui iria el fetch para obtener las tags guardadas
    // Se recibe una lista con todas las tags
    setTagsSimilarTo(['ppt', 'capacitación', 'voluntariado', 'ayuda a familias'])
  }

  // Funcion para guardar el elemento anterior al mostrado actualmente
  // Solo se realiza una vez
  const saveLast = (actualResult) => {
    if (lastResult.length === 0 && iteration === 0) {
      setLastResult(actualResult)
    }
  }

  // Funcion llamada para obtener el listado de personas o categorias
  const getRequired = (showUsernames, showTypes, showSimilarTo) => {
    const actualShow = []

    if (showUsernames) {
      for (let i = 0; i < members.length; i += 1) {
        actualShow.push(members[i].username)
      }
    } else if (showTypes) {
      for (let a = 0; a < members.length; a += 1) {
        for (let i = 0; i < members[a].type.length; i += 1) {
          actualShow.push(members[a].type[i])
        }
      }
    } else if (showSimilarTo) {
      // Mostramos todas las etiquetas
      for (let i = 0; i < tagsSimilarTo.length; i += 1) {
        actualShow.push(tagsSimilarTo[i])
      }
    }

    // Eliminando posibles elementos repetidos
    saveLast([...new Set(actualShow)])
    setShowRequired([...new Set(actualShow)])
  }

  // Funcion llamada en onClick para mostrar los miembros de cierta categoria
  const showMembers = (actualType) => {
    const actualMembers = []
    iteration += 1

    for (let i = 0; i < members.length; i += 1) {
      for (let a = 0; a < members[i].type.length; a += 1) {
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

    if (showSimilarTo) {
      // Mostramos etiquetas similares
      for (let i = 0; i < tagsSimilarTo.length; i += 1) {
        if (tagsSimilarTo[i].includes(actualSearch)) {
          getSearch.push(tagsSimilarTo[i])
        }
      }
    } else {
      // Mostramos miembros o categorias similares
      for (let i = 0; i < members.length; i += 1) {
        for (let a = 0; a < members[i].type.length; a += 1) {
          if ((members[i].type[a]).includes(actualSearch)) {
            getSearch.push(members[i].type[a])
          }
        }
        if ((members[i].username).includes(actualSearch)) {
          getSearch.push(members[i].username)
        }
      }
    }

    saveLast([...new Set(getSearch)])
    setShowRequired([...new Set(getSearch)])
  }

  // Funcion llamada para saber si mostrar el boton de mas o no
  const showButton = (result) => {
    for (let i = 0; i < members.length; i += 1) {
      for (let a = 0; a < members[i].type.length; a += 1) {
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

  // Manda a llamar el resultado anterior
  // Funcion en onClick del boton regresar
  const showLast = () => {
    setShowRequired(lastResult)
    setReturn(false)
  }

  // Guarda la persona seleccionada
  const saveReference = (result) => {
    if (showSimilarTo) {
      setSendToTag([...sendToTag, result])
      setSimilarTo([...sendToTag, result])
    } else if (showButton(result)) {
      setSendResourceToCategory([...sendResourceToCategory, result])
      setTagsCategory([...sendResourceToCategory, result])
    } else {
      setSendResourceToAccount([...sendResourceToAccount, result])
      setTagsAccount([...sendResourceToAccount, result])
    }
  }

  useEffect(() => {
    if (showSimilarTo) {
      getSimilarToTags() // Obtenemos las tags para similares a
    } else {
      getMembers() // Obtenemos miembros y sus categorias
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', async (event) => {
      if (refList.current !== null) {
        const isClickInsideElement = await refList.current.contains(event.target)
        if (!isClickInsideElement && event.target.type !== 'button') {
          setShowRequired([])
          setReturn(false)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (showUsernames || showTypes || (showSimilarTo && actualSearch === undefined)) {
      getRequired(showUsernames, showTypes, showSimilarTo)
    } else {
      showSimilar(actualSearch)
    }
  }, [members, tagsSimilarTo])

  // Cada vez que cambie la busqueda
  useEffect(() => {
    if (actualSearch !== undefined) {
      showSimilar(actualSearch)
    }
  }, [actualSearch])

  return (
    <ul className="list" ref={refList}>
      { showReturn
        ? (
          <li id="return">
            <button type="button" onClick={() => showLast(showRequired)}>◀</button>
            <p>Regresar</p>
          </li>
        ) : ''}

      {showRequired.map((result) => (
        <li key={result}>
          <p onClick={() => saveReference(result)}>{result}</p>
          {showButton(result) && !creatingAccount ? <button type="button" onClick={() => showMembers(result)}>▶</button> : ''}
        </li>
      ))}
    </ul>
  )
}

List.propTypes = {
  actualSearch: PropTypes.string,
  showTypes: PropTypes.bool,
  showSimilarTo: PropTypes.bool,
  setSimilarTo: PropTypes.func,
  showUsernames: PropTypes.bool,
  setTagsAccount: PropTypes.func,
  setTagsCategory: PropTypes.func,
  creatingAccount: PropTypes.bool,
}

List.defaultProps = {
  actualSearch: '',
  showTypes: false,
  showUsernames: false,
  showSimilarTo: false,
  setSimilarTo: () => {},
  setTagsAccount: () => {},
  setTagsCategory: () => {},
  creatingAccount: false,
}

export default List
