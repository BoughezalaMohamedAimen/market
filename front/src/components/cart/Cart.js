import React from 'react';
import CartItem from './CartItem'


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
          <CartItem shared={this.props.state} cartItem={cartitem} getCart={this.props.getCart}  />
          )
        })}

      </div>
      <div className="container">

          <div className="bg-day text-white text-center py-2" onClick={(e)=>{}}>
            <b>COMMANDER</b>
          </div>
      </div>
      </React.Fragment>
      )
  }
}

export default Cart ;
