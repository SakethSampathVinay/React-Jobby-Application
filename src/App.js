import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItemContainer from './components/JobItemContainer'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemContainer} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
