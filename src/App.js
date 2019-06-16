import React, {Component} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {persistStore} from 'redux-persist'
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// Import Extra styles for Dashboard and Monitorboard components
// import "./containers/SimulationDetail/styles.css"
// Import React Ladda Styles
import 'ladda/dist/ladda-themeless.min.css';
//import extra css
import './extraStyles.css'
// Containers
import DefaultLayout from './containers/DefaultLayout/';

import Login from './views/Login/Login'
//Redux Store
import storeFactory from "./redux/store"
// import Full from './containers/Full/Full'

const store = storeFactory
window.store = store



// import { renderRoutes } from 'react-router-config';

class App extends Component {
  constructor() {
    super()
    this.state = {
      rehydrated: false,
      expContract: false,
    }
  }

  componentWillMount(){
    persistStore(store, {}, () => { this.setState({ rehydrated: true } )})
   }

  toggle(name) {
    this.setState({
    [name]: !this.state[name],
    progress: 0.5
    })
  }

  render() {
    if(!this.state.rehydrated){
      return (
        <div className="animated fadeIn"> ..... </div>
      )
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
