import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')


class Qtt extends React.Component {
  render() {
    return(
      <React.Fragment>
        <input class="w-100 text-center border-0 mb-2 bg-darkgray rounded" type="number" placeholder={this.props.cartItem.qtt} onChange={(e)=>{this.set_qtt(this.props.cartItem.id,e.target.value)}}/>
      </React.Fragment>
      )
  }
  set_qtt=async(id,qtt)=>{
    var token=await reactLocalStorage.get('token');
    var ths=this;
    console.log(`token ******************** ${token}`);
    if (token!=null)
    {
      await axios.post(this.props.shared.urls.cart_qtt, {
          id:id,
          qtt:qtt,
        },{headers:{Authorization: `Token ${token}`}})
        .then(function (response) {
          if(response.status==200)
          {
            console.log("response set qtt cart by user 200");
            console.log(ths);
            // this.cart_refresh()
            ths.props.getCart()
          }
           alert(response.data.message)
        })
        .catch(function (error) {
          console.log("error set qtt  cart by user");
          console.log(error);
        });
    }
    else
     {

       var session= await reactLocalStorage.get('session')
       await axios.post(this.props.shared.urls.cart_qtt, {
           id:id,
           session:session,
           qtt:qtt
         },{timeout:5000})
         .then(function (response) {
           if(response.status==200)
           {
             // alert("added")
             console.log("response set qtt cart by session 200");
             console.log(ths);
             // this.cart_refresh()
             ths.props.getCart()
           }
           alert(response.data.message)
         })
         .catch(function (error) {
           console.log("error set qtt  cart by session");
           console.log(error);
         });
    }
  }
}

export default Qtt ;
