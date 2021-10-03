import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login'
import ForgotPassword from './Components/ForgotPassword/forgotPassword'
import TokenForgetPass from './Components/ForgotPassword/forgotPasswordVerify'
import serviceProvider from './Components/ServiceProvider/serviceProvider'
import ClientRoutes from './ClientRoutes'
import AdminRoutes from './AdminRoutes'

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/client" component={ClientRoutes} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/forgotPasswordToken" component={TokenForgetPass} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/serviceProvider" component={serviceProvider} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  </>
)

export default App
