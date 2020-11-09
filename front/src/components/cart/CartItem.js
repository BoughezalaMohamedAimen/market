import React from 'react';
import DeleteButton from './DeleteButton'
import Qtt from './Qtt'



class CartItem extends React.Component {

  render() {
    var cartitem=this.props.cartItem
    return(
      <React.Fragment>
      <div className="row mb-3" key={cartitem.id} >
        <div  className="col-4"> <img src={`http://192.168.1.23:8000${cartitem.details.image1}`} className="img-fluid"/></div>
        <div  className="col border-bottom">
        <div className="h6">{ cartitem.details.title }</div>
        {cartitem.attributes_details.map((attribute)=>(
          <small className="text-secondary"> {attribute.attribute}: {attribute.value}</small>
        ))}
        <div className="mb-2">{this.price(cartitem.details)}</div>
        </div>

        <div  className="col-2 border-bottom text-secondary text-center">
          <DeleteButton shared={this.props.shared} getCart={this.props.getCart} cartItem={cartitem}/>
          <Qtt shared={this.props.shared} getCart={this.props.getCart} cartItem={cartitem} />
        </div>

      </div>
      </React.Fragment>
      )
  }



  price=(post)=>{
    if(post.promotional>0)
      return (
          <React.Fragment>
          <span className="badge text-white bg-green">{post.promotional} DA</span>
          </React.Fragment>
      )
      else
      return(
        <React.Fragment>
         <span className="badge text-white bg-green">{post.price} DA</span>
        </React.Fragment>
      )
  }

}

export default CartItem ;
