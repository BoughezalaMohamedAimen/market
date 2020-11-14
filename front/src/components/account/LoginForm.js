import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')

class LoginForm extends React.Component {

  state={
    username:"",
    password:"",
  }

  render() {
    return(
      <div className="login-wrapper bg-night">
        <div className="center-absolute text-white container">
        username:
          <input type="text" className="login-input"  onChange={(e)=>this.setState({username:e.target.value})} />
          <br/>
          password:
            <input type="password" className="login-input"  onChange={(e)=>this.setState({password:e.target.value})} />
            <br/>
          <div className="bg-day text-white text-center py-2" onClick={(e)=>this.connect(this)}> LOG IN </div>
        </div>
      </div>
      )
  }

  connect=async(ths)=>{
    this.shared_state=JSON.parse(document.getElementById("sharedState").innerHTML)

          axios.post(this.shared_state.urls.auth, {
              username: this.state.username,
              password: this.state.password
            })
            .then(function (response) {
              if(response.status==200){
                reactLocalStorage.set('token', response.data.token);
                ths.props.getCart()
              }
              if(response.status==400)
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
            }
}

export default LoginForm ;
