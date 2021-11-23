/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import swal from 'sweetalert'
import { useHistory } from 'react-router-dom'
import apiURL from '../fetch'
import logo from '../../static/imagesNavBar/logo.png'
import accountIcon from '../../static/imagesNavBar/account.png'
import createAccountIcon from '../../static/imagesNavBar/addAccount.png'
import megaphoneIcon from '../../static/imagesNavBar/megaphone.png'
import uploadIcon from '../../static/imagesNavBar/upload.png'
import logoutIcon from '../../static/imagesNavBar/logout.png'
import './NavBar.css'

const NavBarAdmin = () => {
  const history = useHistory()

  const logout = () => {
    swal({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de querer cerrar sesión?',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then(async (res) => {
      if (res) {
        fetch(`${apiURL}/user/logout/${localStorage.getItem('username')}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}` },
        })
        localStorage.clear()
        history.replace('/')
      }
    })
  }

  return (
    <div id="Navbar">
      <img className="logo" src={logo} alt="logo" onClick={() => history.push('/admin')} />
      <div className="icons">
        <img src={megaphoneIcon} alt="megaphone icon" onClick={() => history.push('/admin/announcement')} />
        <img src={uploadIcon} alt="upload icon" onClick={() => history.push('/admin/upload')} />
        <img src={createAccountIcon} alt="create account icon" onClick={() => history.push('/admin/createAccount')} />
        <img src={accountIcon} alt="account icon" onClick={() => history.push('/admin/management')} />
        <img src={logoutIcon} alt="logout icon" onClick={() => logout()} />
      </div>
    </div>
  )
}

export default NavBarAdmin
