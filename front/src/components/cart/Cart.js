import React from 'react';
import CartItem from './CartItem'
const axios=require('axios')

class Cart extends React.Component {



  componentDidMount(){
    }

  render() {
    return(
      <React.Fragment>
      <div className="py-2 bg-day h4 text-center text-white"> MON PANIER </div>
      <div className="container py-4">
      {this.props.state.cart.map(cartitem=>{
        return(
          <CartItem cartItem={cartitem}/>
          )
        })}

      </div>
      </React.Fragment>
      )
  }
}

export default Cart ;
