import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';

export default class App extends Component {
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  }

  checkLoginStatus = () =>{
    axios
     .get("http://localhost:3000/logged_in", { withCredentials: true })
     .then(response => {
       if(response.data.logged_in && this.state.loggedInStatus == "NOT_LOGGED_IN"){
         this.setState({
           loggedInStatus: "LOGGED_IN",
           user: response.data.user
         })
       }else if(!response.data.logged_in && this.state.loggedInStatus == "LOGGED_IN"){
         this.setState({
           loggedInStatus: "NOT_LOGGED_IN",
           user: {}
         })
       }
     })
     .catch(error => {console.log("check loggin error", error)})
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogout = () =>{
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin = (data) =>{
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
          <Route exact
            path={"/"}
            render={ props =>(
              <Home {...props} 
              handleLogin = {this.handleLogin}  
              handleLogout = {this.handleLogout}
              loggedInStatus={this.state.loggedInStatus} 
            />
            )} 
          />

          <Route exact
            path={"/dashboard"}
            render={ props =>(
              <Dashboard {...props} loggedInStatus={ this.state.loggedInStatus } />
            )}
          />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
