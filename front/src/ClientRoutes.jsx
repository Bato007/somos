import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import VResourcesNormal from './Components/ViewResourcesNormal/ViewResourcesNormal'
import Announcement from './Components/Announcement/Announcement'
import NavBar from './Components/NavBar/NavBar'
import WriteMessage from './Components/WriteMessage/WriteMessage'
import ManageAccount from './Components/ManageAccount/ManageAccount'

const ClientRoutes = () => (
  <>
    <NavBar />
    <Route path="/client/management" component={ManageAccount} />
    <Route path="/client/announcement" component={Announcement} />
    <Route path="/client/write" component={WriteMessage} />
    <Route path="/client/viewresources" component={VResourcesNormal} />
    <Route exact path="/client" component={Home} />
  </>
)

export default ClientRoutes
