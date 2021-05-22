import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload'
import Create from './Components/CreateAccount/Info'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Usuario from './Components/CreateAccount/Usuario'
import Ubicacion from './Components/CreateAccount/Ubicacion'
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
      <Route path='/createaccount-3' component={Ubicacion} />
      <Route path='/createaccount-2' component={Usuario} />
      <Route path='/createaccount' component={Create} />
      <Route path='/upload' component={Upload} />
      <Route path='/home' component={Home} />
      <Route path='/' component={Login} />
    </Switch>
  </Router>
)

export default App
