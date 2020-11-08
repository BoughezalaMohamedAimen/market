import React from 'react';


const axios=require('axios')


class Register extends React.Component {
  state={
    first_name:"",
    last_name:"",
    telephone:"",
    email:"",
    username:"",
    adresse:"",
    wilaya:0,
    commune:0,
  }

  saveprofile=async()=>{
    await axios.post(this.props.state.urls.register, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        telephone: this.state.telephone,
        adresse: this.state.adresse,
        commune: this.state.commune,
      })
      .then(function (response) {
        console.log("response is ");
        console.log(response.data);
        if(response.status==200){
          //TODO AFTER REGISTRATION
        }
      })
      .catch(function (error) {
        console.log("error is ");
        // if(error.response.status==400)
        // {
          alert(`${Object.keys(error.response.data)[0]}: ${error.response.data[Object.keys(error.response.data)[0]][0]}`);
        // }
        // console.log(error.response.data);
      });
  }
  render() {
    return(
      <React.Fragment>
      <div className="alert alert-danger" id="register-errors"></div>
      first_name: <input  type="text" placeHolder={"votre nom"} onChange={(e)=>{ if(e.target.value!="")  this.setState({first_name:e.target.value})} }/><br/>
      last_name:<input  type="text" placeHolder={"votre prenom"} onChange={(e)=>{ if(e.target.value!="")  this.setState({last_name:e.target.value})} }/><br/>
      telephone:<input  type="text" placeHolder={"numero de telephone"} onChange={(e)=>{ if(e.target.value!="")   this.setState({telephone:e.target.value})} }/><br/>
      adresse:<input  type="text" placeHolder={"votre adresse"} onChange={(e)=>{ if(e.target.value!="")  this.setState({adresse:e.target.value})} }/><br/>
      wilaya:
      <select onChange={(e)=>this.setState({wilaya:e.target.value})}>
      <option value={0}> choisir wilaya </option>
        {this.props.state.regions.map((region)=>{
          return region.wilayas_list.map((wilaya)=>(
            <option key={wilaya.id} value={wilaya.id} >{wilaya.name}</option>
          ))
        })}
      </select>
      commune:
      <select onChange={(e)=>this.setState({commune:e.target.value})}>
      <option value={0}> choisir commune </option>
        {this.props.state.regions.map((region)=>{
          return region.wilayas_list.map((wilaya)=>{
            if(wilaya.id==this.state.wilaya)
            return wilaya.communes.map((commune)=>(
              <option key={commune.id} value={commune.id} selected={commune.id==this.state.commune} >{commune.name}</option>
            ))
          })
        })}
      </select><br/>
      username:<input  type="text" placeHolder={"nom d'utilisateur"} onChange={(e)=>{ if(e.target.value!="")  this.setState({username:e.target.value})} }/><br/>
      email:<input  type="email" placeHolder={"votre email"} onChange={(e)=>{ if(e.target.value!="")  this.setState({email:e.target.value})} }/><br/>
      mot de passe:<input  type="text" placeHolder={"mot de passe "} onChange={(e)=>{ if(e.target.value!="")  this.setState({password:e.target.value})} }/><br/>



          <a className="btn btn-dark" onClick={(e)=>this.saveprofile()}> Connexion </a>
      </React.Fragment>
      )
  }
}

export default Register ;
