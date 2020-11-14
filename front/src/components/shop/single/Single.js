import React from 'react';
import $ from "jquery";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {reactLocalStorage} from 'reactjs-localstorage';




const axios=require("axios");

class Single extends React.Component {
  state={
    post:null
  }
  componentDidMount(){
    this.get_post()
  }

  render() {
    return(
      <React.Fragment>
        {this.render_post()}
      </React.Fragment>
      )
  }


  render_post=()=>{
    if(this.state.post!=null)
    return(
        <div className="container py-3 bg-darkgray">
          <OwlCarousel className="owl-theme" loop={true} margin={5} nav={false} dots={true} items={1} timeout={1000}>
              {this.img_caroussel(this.state.post.title,this.state.post.image1)}
              {this.img_caroussel(this.state.post.title,this.state.post.image2)}
              {this.img_caroussel(this.state.post.title,this.state.post.image3)}
              {this.img_caroussel(this.state.post.title,this.state.post.image4)}
              {this.img_caroussel(this.state.post.title,this.state.post.image5)}
              {this.img_caroussel(this.state.post.title,this.state.post.image6)}
          </OwlCarousel>
          <div className="bg-green py-2 text-white h3 px-3">
          {this.price(this.state.post)}
          </div>
          <div className="container">
            <div className="row">
          {this.state.post.postattributes.map((postattribute)=>{
            return(
                  <div className="col-6 mb-2" key={postattribute.id}>
                    <select className="simple-select" onChange={(e)=>{this.set_attr(this.state.post.id)}} data-product={this.state.post.id}>
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
        <div className="bg-day text-white text-center py-2" onClick={(e)=>{this.add_to_cart(this.state.post)}}>
          <b>AJOUTER AU PANIER</b>
        </div>
        <div className="py-4" dangerouslySetInnerHTML={{ __html: this.state.post.description }}></div>
        </div>
    )
  }


  get_post=()=>{
    axios.get(`${this.props.shared.urls.single_post}${this.props.match.params.slug}`, { timeout:6000})
    .then(response => {
      console.log("response***** single post  *****************");
      console.log(response);
        if(response.status==200)
        {
          this.setState({post:response.data})
        }
     })
    .catch((error) => {
        console.log('error single post' + error);
     });
  }

  price=(post)=>{
    if(post.promotional>0)
      return (
          <React.Fragment>
          <small class="badge badge-secondary"><del>{post.price} DA</del></small> <b>{post.promotional} DA</b> <br/>
          </React.Fragment>
      )
      else
      return(
        <React.Fragment>
         <b>{post.price} DA</b> <br/>
        </React.Fragment>
      )
  }
  img_caroussel=(title,image)=>{
    if(image!=null)
    return(
      <div className="item shadow bg-white">
      <div className="shop-img" style={{background: `url(${this.props.shared.urls.url}${image})`}}>
        <div className="img-title" >
          <h2 className="font-weight-bold my-2 text-uppercase text-night text-center">{title}</h2>
        </div>
      </div>
      </div>
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

export default Single ;
