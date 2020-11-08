import React from 'react';

class CartItem extends React.Component {
  render() {
    var cartitem=this.props.cartItem
    return(
      <React.Fragment>
      <div className="row mb-3" key={cartitem.id} >
        <div  class="col-4"> <img src={`http://192.168.1.23:8000/${cartitem.details.image1}`} className="img-fluid"/></div>
        <div  class="col border-bottom">
        <div className="h6">{ cartitem.details.title }</div>
        {cartitem.attributes_details.map((attribute)=>(
          <small> <b>{attribute.attribute} {attribute.value}</b></small>
        ))}
        </div>
      </div>
      </React.Fragment>
      )
  }
}

export default CartItem ;
