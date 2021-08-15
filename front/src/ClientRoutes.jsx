import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import VResources from './Components/ViewResources/ViewResources'
import Announcement from './Components/Announcement/Announcement'
import NavBar from './Components/NavBar/NavBar'

const ClientRoutes = () => (
  <>
    <NavBar />
    <Router>
      <Switch>
        <Route path="/client/announcement" component={Announcement} />
        <Route path="/client/viewresources" component={VResources} />
        <Route path="/client" component={Home} />
      </Switch>
    </Router>
  </>
)

export default ClientRoutes
