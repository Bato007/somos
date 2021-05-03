import React from 'react'
import PropTypes  from 'prop-types'
import './Input.css'

/** 
 * className: Class name en Input.css
 * type: Tipo de input: text/password/etc
 * name: Texto del input
 * placeholder: Placeholder en el input
 * onChange: Funcion para leer los input del usuario
 * **/
const Input = ({ className, type, name, placeholder, onChange }) => (
  <input className={className} type={type} name={name} placeholder={placeholder}  onChange={onChange} />
)

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  name: '',
  placeholder: '',
  className: '',
  type: '',
  onChange: () => {},
}

export default Input