import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';


class Order extends React.Component {
  state={
    name:"",
    info:"",
    telephone:"",
    adresse:"",
    wilaya:0,
    commune:0,
    livraison:0
  }
  componentDidMount(){
    const user=JSON.parse(reactLocalStorage.get('user'))
      this.setState({name:`${user.first_name} ${user.last_name}`})
      this.setState({wilaya:user.wilaya})
      this.setState({telephone:user.telephone})
      this.setState({email:user.email})
      this.setState({commune:user.commune})
      this.setState({adresse:user.adresse})
  }

  render() {

    return(
      <React.Fragment>
        <div className="py-2 bg-blue h4 text-center text-white mb-0"> NEW ORDER PAGE</div>
        <div className="container">
          <div className="row">
          <div className="col-md-12 py-2">
            <b>Nom et prénom:</b> <br/>
            <input  class="user-input" type="text" placeHolder={`${this.state.name} `} onChange={(e)=>{ if(e.target.value=="") this.setState({name:this.props.state.user.first_name}); else  this.setState({name:e.target.value})} }/>
          </div>
          <div className="col-md-12 py-2">
            <b>E-mail</b> <br/>
            <input  class="user-input" type="text" placeHolder={`${this.state.email} `} onChange={(e)=>{ if(e.target.value=="") this.setState({email:this.props.state.user.email}); else  this.setState({email:e.target.value})} }/>
          </div>
          <div className="col-md-12 py-2">
            <b>Telephone:</b> <br/>
            <input  class="user-input" type="text" placeHolder={`${this.state.telephone} `} onChange={(e)=>{ if(e.target.value=="") this.setState({telephone:this.props.state.user.telephone}); else  this.setState({telephone:e.target.value})} }/>
          </div>

            <div className="col-md-6 py-2">
            <b>Wilaya:</b> <br/>
            <select onChange={(e)=>this.setState({wilaya:e.target.value})}>
            <option value={0}> selectionner une wilaya </option>
              {this.props.sharedState.regions.map((region)=>{
                return region.wilayas_list.map((wilaya)=>(
                  <option key={wilaya.id} value={wilaya.id} selected={wilaya.id==this.state.wilaya} >{wilaya.name}</option>
                ))
              })}
            </select>
            </div>
            <div className="col-md-6 py-2">
            <b>Commune:</b> <br/>
            <select onChange={(e)=>{this.setState({commune:e.target.value})  }}>
            <option value={0}> selectionner une commune </option>
              {this.props.sharedState.regions.map((region)=>{
                return region.wilayas_list.map((wilaya)=>{
                  if(wilaya.id==this.state.wilaya)
                  return wilaya.communes.map((commune)=>(
                    <option key={commune.id} value={commune.id} selected={commune.id==this.state.commune} >{commune.name}</option>
                  ))
                })
              })}
            </select>
            </div>
            <div className="col-md-12 py-2">
              <b>Adresse:</b> <br/>
              <input  class="user-input" type="text" placeHolder={this.state.adresse} onChange={(e)=>{ if(e.target.value=="") this.setState({adresse:this.props.sharedState.user.adresse}); else  this.setState({adresse:e.target.value})} }/>
            </div>
          </div>
        </div>

        <div className="text-right   py-3"><span className="p-3 bg-day text-white"> TOTAL PANIER: {reactLocalStorage.get('totalcart')} DA</span></div>

        <div className="text-right   py-3"><span className="p-3 bg-day text-white"> FRAIS DE LIVRAISON: {this.set_livraison()} DA</span></div>
        <div className="text-right   py-3"><span className="p-3 bg-day text-white"> TOTAL: {this.set_livraison()+parseInt(reactLocalStorage.get('totalcart'))} DA</span></div>
      </React.Fragment>
      )
  }

  set_livraison=()=>{
    var livraison=0;
     this.props.sharedState.regions.map((region)=>{
       region.wilayas_list.map((wilaya)=>{
        if(wilaya.id==this.state.wilaya)
          livraison=wilaya.prix
      })
    })
    return parseInt(livraison)
  }


}

export default Order ;
