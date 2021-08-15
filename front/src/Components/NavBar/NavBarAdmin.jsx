/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../static/imagesNavBar/logo.png'
import accountIcon from '../../static/imagesNavBar/account.png'
import createAccountIcon from '../../static/imagesNavBar/addAccount.png'
import megaphoneIcon from '../../static/imagesNavBar/megaphone.png'
import uploadIcon from '../../static/imagesNavBar/upload.png'
import './NavBar.css'

const NavBarAdmin = () => {
  const history = useHistory()

  return (
    <div id="Navbar">
      <img className="logo" src={logo} alt="logo" onClick={() => history.replace('/admin/home')} />
      <div className="icons">
        <img src={megaphoneIcon} alt="megaphone icon" onClick={() => history.replace('/admin/announcement')} />
        <img src={uploadIcon} alt="upload icon" onClick={() => history.replace('/admin/upload')} />
        <img src={createAccountIcon} alt="create account icon" onClick={() => history.replace('/admin/createAccount')} />
        <img src={accountIcon} alt="account icon" onClick={() => history.replace('/admin/management')} />
      </div>
    </div>
  )
}

export default NavBarAdmin
