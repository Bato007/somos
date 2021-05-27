import React, { useEffect, useState } from 'react'
import PropTypes  from 'prop-types'
import './Tags.css'

/**
 * Etiquetas usadas para: 
 *  Mostrar en la barra de busqueda
 *  Recursos similares
 * 
 * showTags: son las etiquetas a mostrar guardadas en una lista
 * isClosable: bool => muestra la opcion de eliminar si es deseado
 *  ej. a quien mandarle el recurso es eliminable, 
 *      pero una etiqueta de recursos similares a no lo es
 */
const Tags = ({ showTags, isClosable }) => {
  const [actualTags, setActualTags] = useState([])
  const [updateTags, setUpdateTags] = useState(false)

  useEffect(() => {
    setActualTags(showTags)
  }, [showTags])

  // Funcion onClick al querer eliminar un elemento
  const removeTag = async (result) => {
    var index = actualTags.indexOf(result)

    if (index !== -1) {
      actualTags.splice(index, 1)
      setUpdateTags(true)
    }
  }

  // Actualizamos la vista cada vez que se borra una tag
  useEffect(() => {
    if (updateTags) {
      setActualTags(actualTags)
      setUpdateTags(false)
    }
  }, [actualTags, updateTags])
  
  return (
    <ul className='tags'>
      {actualTags.map((result) => (
          <li className="tag" key={result} >
            {result}

            { isClosable ? <button type="button" onClick={() => removeTag(result)}>✖</button> : ''}
          </li>
        ))}
    </ul>
  )
}

Tags.propTypes = {
  showTags: PropTypes.arrayOf(PropTypes.string.isRequired),
  isClosable: PropTypes.bool,
}

Tags.defaultProps = {
  showTags: [''],
  isClosable: false,
}

export default Tags
