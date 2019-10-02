import React, {Component} from 'react';
import axios from 'axios';
import Registration from './auth/Registration';
import Login from './auth/Login';

export default class Home extends Component{
  constructor(props){
    super(props);
  }

  handleSuccessfulAuth = (data) =>{
    // TODO update parent components
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogout = () =>{
    axios.delete("http://localhost:3000/logout", {withCredentials: true})
    .then(response =>{
      this.props.handleLogout()
    })
    .catch(error =>{
      console.log("logout error", error)
    })
  }

  render(){
    return(
      <div>
        <h1>HOME</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick = {()=> this.handleLogout()}>Logout</button>
        <Registration handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
        <Login handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
      </div>
    );
  }
}