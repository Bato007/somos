import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProtectedRoute from './Components/ProtectedRoutes'

const App = () => (
  <Router>
    <Switch>
      <ProtectedRoute path='/home' component={Home} />
      <Route path='/' component={Login} />
    </Switch>
  </Router>
)

export default App
