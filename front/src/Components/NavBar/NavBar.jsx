/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../static/imagesNavBar/logo.png'
import accountIcon from '../../static/imagesNavBar/account.png'
import megaphoneIcon from '../../static/imagesNavBar/megaphone.png'
import logoutIcon from '../../static/imagesNavBar/logout.png'
import './NavBar.css'

const NavBar = () => {
  const history = useHistory()

  const logout = () => {
    localStorage.clear()
    history.replace('/')
  }

  return (
    <div id="Navbar">
      <img className="logo" src={logo} alt="logo" onClick={() => history.replace('/client')} />
      <div className="icons">
        <img src={megaphoneIcon} alt="megaphone icon" onClick={() => history.replace('/client/announcement')} />
        <img src={accountIcon} alt="account icon" onClick={() => history.replace('/client/management')} />
        <img src={logoutIcon} alt="logout icon" onClick={() => logout()} />
      </div>
    </div>
  )
}

export default NavBar
