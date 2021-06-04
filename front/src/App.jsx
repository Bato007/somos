import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload'
import Create from './Components/CreateAccount/Create'
// import ProtectedRoute from './Components/ProtectedRoutes'

/*
const App = () => (
  <Router>
    <Switch>
      <ProtectedRoute path='/home' component={Home} />
      <Route path='/' component={Login} />
    </Switch>
  </Router>
)
*/

const App = () => (
  <Router>
    <Switch>
      <Route path="/createaccount" component={Create} />
      <Route path="/upload" component={Upload} />
      <Route path="/home" component={Home} />
      <Route path="/" component={Login} />
    </Switch>
  </Router>
)

export default App
