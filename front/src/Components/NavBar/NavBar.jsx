import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from './images/logo.png'
import accountIcon from './images/account.png'
import createAccountIcon from './images/addAccount.png'
import megaphoneIcon from './images/megaphone.png'
import uploadIcon from './images/upload.png'
import './NavBar.css'

const NavBar = () => {
  const history = useHistory()

  return (
    <div id="Navbar">
      <img className="logo" src={logo} alt="logo" onClick={() => history.push('./home')} />
      <div className="icons">
        <img src={megaphoneIcon} alt="megaphone icon" onClick={() => history.push('./announcement')} />
        <img src={uploadIcon} alt="upload icon" onClick={() => history.push('./upload')} />
        <img src={createAccountIcon} alt="create account icon" onClick={() => history.push('./createAccount')} />
        <img src={accountIcon} alt="account icon" onClick={() => history.push('./account')} />
      </div>
    </div>
  )
}

export default NavBar
