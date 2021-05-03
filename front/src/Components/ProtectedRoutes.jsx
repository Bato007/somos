import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import authentication from './Authentication'

/***
 * Evitar que usuarios sin ingresar a la cuenta puedan acceder a los recursos
 * Donde props es un componente al cual se verifica si el estado de log in es true
 * Si el estado de log in es false, se redirige a la pagina de log in automaticamente
 */
const ProtectedRoute = (props) =>  (
  <Route path={props.path}
    render={data => authentication.getLogInStatus() ? (<props.component {...data} />) :
    (<Redirect to={{pathname:'/', state: { from: props.location }}} />)
  } />
)

export default ProtectedRoute