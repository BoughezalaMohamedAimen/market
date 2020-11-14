import React from 'react';
import $ from "jquery";
import {Link} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')


class Item extends React.Component {

  state={
    selected_attr:[],
  }
  render() {
    return(
      <div className="col-md-4">
          <div className="shop-img" style={{background: `url(${this.props.shared.urls.url}${this.props.post.image1})`}}>
            <div className="img-title" >
              <h5 className="h6 font-weight-bold my-2 text-uppercase text-night text-center"><Link to={`/products/${this.props.post.slug}`}>{this.props.post.title}</Link></h5>
            </div>
          </div>
          <div className="container bg-white shadow mb-3 pb-3">
            <div className="container shop-short py-3 text-center h5 text-night">
            {this.price(this.props.post)}
            </div>
            <div className="container">
              <div className="row">
            {this.props.post.postattributes.map((postattribute)=>{
              return(
                    <div className="col-6 mb-2" key={postattribute.id}>
                      <select className="simple-select" onChange={(e)=>{this.set_attr(this.props.post.id)}} data-product={this.props.post.id}>
                      <option value={0} > Choisir {Object.keys(postattribute)[0]} </option>
                      {postattribute[Object.keys(postattribute)[0]].map((value)=>{
                      return (  <option value={value.id}> {Object.keys(postattribute)[0]} {this.get_attribute_value(value)}</option>)
                      })}
                      </select>
                    </div>
              )
            })}
            </div>
          </div>

            <div className="bg-day text-white text-center py-2" onClick={(e)=>{this.add_to_cart(this.props.post)}}>
              <b>AJOUTER AU PANIER</b>
            </div>
          </div>
      </div>
      )
  }

  price=(post)=>{
    if(post.promotional>0)
      return (
          <React.Fragment>
          <small class="badge badge-secondary"><del>{this.props.post.price} DA</del></small> <b>{this.props.post.promotional} DA</b> <br/>
          </React.Fragment>
      )
      else
      return(
        <React.Fragment>
         <b>{this.props.post.price} DA</b> <br/>
        </React.Fragment>
      )
  }

cart_refresh=()=>{
  this.props.getCart()
}

  ajax_cart=async(post,attributes)=>{
    var token=reactLocalStorage.get('token');
    var ths=this;

    if (token!=null)
    {
      await axios.post(this.props.shared.urls.add_to_cart, {
          post: post,
          qtt:1,
          attributevalues: attributes
        },{headers:{Authorization: `Token ${reactLocalStorage.get('token')}`}})
        .then(function (response) {
          if(response.status==201)
          {
            console.log("response adding cart by user 200");
            console.log(ths);
            // this.cart_refresh()
            ths.props.getCart()
          }
           alert(response.data.message)
        })
        .catch(function (error) {
          console.log("error adding to cart by user");
          console.log(error);
        });
    }
    else
     {

       var session= await reactLocalStorage.get('session')
       await axios.post(this.props.shared.urls.add_to_cart, {
           post: post,
           qtt:1,
           attributevalues: attributes,
           session:session
         },{timeout:5000})
         .then(function (response) {
           if(response.status==201)
           {
             // alert("added")
             console.log("response adding cart by session 200");
             console.log(ths);
             // this.cart_refresh()
             ths.props.getCart()
           }
           alert(response.data.message)
         })
         .catch(function (error) {
           console.log("error adding to cart by session");
           console.log(error);
         });
    }

  }

  add_to_cart=(post)=>{
    var can_add=true;
    $(`select[data-product=${post.id}]`).each(function(index,el){
      if(el.value==0){
        can_add=false;
        $(this).addClass('invalid')
      }
    })
    setTimeout(function(){$(`select[data-product=${post.id}]`).removeClass('invalid')},2200)
    if(can_add==true)
    this.ajax_cart(post.id,this.state.selected_attr)
    else
    console.log('cannoot')
  }
  set_attr=(id)=>{
    var selected=[]
    $(`select[data-product=${id}]`).each(function(index,el){selected.push(el.value)})
    console.log(selected);
    this.setState({selected_attr:selected})
  }
  get_attribute_value=(postattribute)=>{
    if(postattribute.char_value) return postattribute.char_value
    if(postattribute.int_value) return postattribute.int_value
    if(postattribute.date_value) return postattribute.date_value
  }
}

export default Item ;
