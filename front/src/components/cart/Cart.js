import React from 'react';
import CartItem from './CartItem'
import {Link} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

class Cart extends React.Component {
  total=0;

  componentDidMount(){
    }

  render() {
    return(
      <React.Fragment>
      <div className="py-2 bg-blue h4 text-center text-white"> CART </div>
      <div className="container py-4">
      {this.props.state.cart.map(cartitem=>{
        this.total+=cartitem.total
        return(
          <CartItem shared={this.props.state} cartItem={cartitem} getCart={this.props.getCart}  />
          )
        })}

      </div>
      <div className="container">
      <div className="text-right   py-3"><span className="p-3 bg-day text-white"> TOTAL SANS LIVRAISON: {this.total} DA</span></div>
      {this.render_order_link()}
      </div>

      </React.Fragment>
      )
  }
  render_order_link=()=>{

    if(this.total!=0)
    {
      reactLocalStorage.set('totalcart', this.total);
      return (
        <React.Fragment>
        <div className="bg-night text-white text-center py-2" onClick={(e)=>{}}>
          <Link to="/order" ><b>ORDER NOW</b></Link>
        </div>
        </React.Fragment>
      )
    }

  }
}

export default Cart ;
