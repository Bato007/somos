import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload'
import Create from './Components/CreateAccount/Create'
import VResources from './Components/ViewResources/ViewResources'
import Announcement from './Components/Announcement/Announcement'
import Management from './Components/UserManagement/UserMgt'
import NavBarAdmin from './Components/NavBar/NavBarAdmin'

const AdminRoutes = () => (
  <>
    <NavBarAdmin />
    <Router>
      <Switch>
        <Route path="/admin/management" component={Management} />
        <Route path="/admin/announcement" component={Announcement} />
        <Route path="/admin/viewresources" component={VResources} />
        <Route path="/admin/createaccount" component={Create} />
        <Route path="/admin/upload" component={Upload} />
        <Route path="/admin" component={Home} />
      </Switch>
    </Router>
  </>
)

export default AdminRoutes
