import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')

class DeleteButton extends React.Component {
  render() {
    return(
      <React.Fragment>
      <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0,marginTop:0,paddingTop:0}} onClick={(e)=>this.delete(this.props.cartItem.id)}>
        <DeleteIcon />
      </IconButton>
      </React.Fragment>
      )
  }

  delete=async(id)=>{
    var token=await reactLocalStorage.get('token');
    var ths=this;
    console.log(`token ******************** ${token}`);
    if (token!=null)
    {
      await axios.post(this.props.shared.urls.delete_from_cart, {
          id:id,
        },{headers:{Authorization: `Token ${token}`}})
        .then(function (response) {
          if(response.status==200)
          {
            console.log("response remove cart by user 200");
            console.log(ths);
            // this.cart_refresh()
            ths.props.getCart()
          }
           alert(response.data.message)
        })
        .catch(function (error) {
          console.log("error remove to cart by user");
          console.log(error);
        });
    }
    else
     {

       var session= await reactLocalStorage.get('session')
       await axios.post(this.props.shared.urls.delete_from_cart, {
           id:id,
           session:session
         },{timeout:5000})
         .then(function (response) {
           if(response.status==200)
           {
             // alert("added")
             console.log("response remove cart by session 200");
             console.log(ths);
             // this.cart_refresh()
             ths.props.getCart()
           }
           alert(response.data.message)
         })
         .catch(function (error) {
           console.log("error remove to cart by session");
           console.log(error);
         });
    }
  }

}

export default DeleteButton ;
