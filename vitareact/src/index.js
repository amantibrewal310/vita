import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/auth/Login/Login';
import Logout from './components/auth/Logout';
import UserProfile from './components/UserProfile';
import Register from './components/auth/Register';
import GetVideo from './components/GetVideo';

const routing = (
  <Router>
    <React.StrictMode>
      
      <Header />
      
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/play/:id" component={GetVideo} />
      </Switch>
  
      <Footer />
    
    </React.StrictMode>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));