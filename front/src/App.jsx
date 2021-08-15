import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import ClientRoutes from './ClientRoutes'
import AdminRoutes from './AdminRoutes'

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/client" component={ClientRoutes} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  </>
)

export default App
