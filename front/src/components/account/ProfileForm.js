import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')

class ProfileForm extends React.Component {
  state={
    first_name:"",
    last_name:"",
    telephone:"",
    adresse:"",
    wilaya:0,
    commune:0,
  }
  editprofile=async()=>{
    await axios.post(this.props.state.urls.user, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        telephone: this.state.telephone,
        adresse: this.state.adresse,
        commune: this.state.commune,
      },{headers:{Authorization: `Token ${reactLocalStorage.get('token')}`}})
      .then(function (response) {
        if(response.status==200)
        {
          var inputs=document.getElementsByClassName('user-input');
          for (var i = 0; i < inputs.length; ++i)
             inputs[i].value="";


            this.setState({first_name:response.data.first_name});
            this.setState({last_name:response.data.last_name});
            this.setState({telephone:response.data.telephone});
            this.setState({adresse:response.data.adresse});
            this.setState({commune:response.data.commune});
            this.setState({wilaya:response.data.wilaya})

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  get_user=async(token)=>{
    await axios.get(this.props.state.urls.user,{timeout:5000,headers:{Authorization: `Token ${token}`}})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({first_name:response.data.first_name});
        this.setState({last_name:response.data.last_name});
        this.setState({telephone:response.data.telephone});
        this.setState({adresse:response.data.adresse});
        this.setState({commune:response.data.commune});
        this.setState({wilaya:response.data.wilaya})
      }
    })
    .catch(err=>{console.log(err)})
  }


  componentDidMount(){
    this.get_user(reactLocalStorage.get('token'))
  }

  render() {

    return(
      <React.Fragment>
      first_name: <input  class="user-input" type="text" placeHolder={this.state.first_name} onChange={(e)=>{ if(e.target.value=="") this.setState({first_name:this.props.state.user.first_name}); else  this.setState({first_name:e.target.value})} }/><br/>
      last_name:<input  class="user-input" type="text" placeHolder={this.state.last_name} onChange={(e)=>{ if(e.target.value=="") this.setState({last_name:this.props.state.user.last_name}); else  this.setState({last_name:e.target.value})} }/><br/>
      telephone:<input  class="user-input" type="text" placeHolder={this.state.telephone} onChange={(e)=>{ if(e.target.value=="") this.setState({telephone:this.props.state.user.telephone}); else  this.setState({telephone:e.target.value})} }/><br/>
      adresse:<input  class="user-input" type="text" placeHolder={this.state.adresse} onChange={(e)=>{ if(e.target.value=="") this.setState({adresse:this.props.state.user.adresse}); else  this.setState({adresse:e.target.value})} }/><br/>
      wilaya:
      <select onChange={(e)=>this.setState({wilaya:e.target.value})}>
        {this.props.state.regions.map((region)=>{
          return region.wilayas_list.map((wilaya)=>(
            <option key={wilaya.id} value={wilaya.id} selected={wilaya.id==this.state.wilaya} >{wilaya.name}</option>
          ))
        })}
      </select>
      commune:
      <select onChange={(e)=>this.setState({commune:e.target.value})}>
      <option value={0}> selectionner une commune </option>
        {this.props.state.regions.map((region)=>{
          return region.wilayas_list.map((wilaya)=>{
            if(wilaya.id==this.state.wilaya)
            return wilaya.communes.map((commune)=>(
              <option key={commune.id} value={commune.id} selected={commune.id==this.state.commune} >{commune.name}</option>
            ))
          })
        })}
      </select>



          <a className="btn btn-dark" onClick={(e)=>this.editprofile()}> Connexion </a>
      </React.Fragment>
      )
  }
}

export default ProfileForm ;
