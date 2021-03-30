import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'

//pages
import HomePage from './pages/index'
import Registration from './pages/registrationPage'
import EmptyPage from './pages/404Page'


const App = () => {
  return (
      <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/404" component={EmptyPage} />
        <Route exact path="/registration" component={Registration} />  
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
