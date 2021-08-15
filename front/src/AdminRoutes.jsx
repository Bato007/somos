import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload'
import Create from './Components/CreateAccount/Create'
import VResources from './Components/ViewResources/ViewResources'
import AnnouncementAdmin from './Components/Announcement/AnnouncementAdmin'
import Management from './Components/UserManagement/UserMgt'
import NavBarAdmin from './Components/NavBar/NavBarAdmin'

const AdminRoutes = () => (
  <>
    <NavBarAdmin />
    <Route path="/admin/management" component={Management} />
    <Route path="/admin/announcement" component={AnnouncementAdmin} />
    <Route path="/admin/viewresources" component={VResources} />
    <Route path="/admin/createaccount" component={Create} />
    <Route path="/admin/upload" component={Upload} />
    <Route exact path="/admin" component={Home} />
  </>
)

export default AdminRoutes
