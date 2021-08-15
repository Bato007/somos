/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../static/imagesNavBar/logo.png'
import megaphoneIcon from '../../static/imagesNavBar/megaphone.png'
import './NavBar.css'

const NavBarAdmin = () => {
  const history = useHistory()

  return (
    <div id="Navbar">
      <img className="logo" src={logo} alt="logo" onClick={() => history.push('./home')} />
      <div className="icons">
        <img src={megaphoneIcon} alt="megaphone icon" onClick={() => history.push('./announcement')} />
      </div>
    </div>
  )
}

export default NavBarAdmin
