import React from 'react';

import $ from "jquery";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import {reactLocalStorage} from 'reactjs-localstorage';

const axios=require('axios')


class Categories extends React.Component {

  shared_state={}



  componentDidMount(){

  }

  render() {
    return(
      <React.Fragment>

      <div className="py-2 bg-primary h4 text-center text-white mb-0"> CATEGORIES </div>

        <div class="container py-3 bg-darkgray">
          <OwlCarousel className="owl-theme" loop={true} margin={5} nav={false} dots={true} items={1} timeout={1000}>
            {this.props.state.categories.map((cat)=>{
              return (
              <div className="item shadow bg-white" key={cat.id}>
              <div className="shop-img" style={{background: `url(${this.props.state.urls.url}${cat.image})`}}>
                <div className="img-title" >
                  <h2 className="font-weight-bold my-2 text-uppercase text-night text-center">{cat.name}</h2>
                </div>
              </div>


                {cat.childs.map((child_cat)=>{
                  return (
                  <div className="px-3 py-3" key={child_cat.id}>
                    <span class="badge bg-green text-white" style={{fontSize:"25px"}} onClick={(e)=>{this.categorie_filter(child_cat)}}>{child_cat.name}</span>
                    <div className="px-3">
                    {child_cat.childs.map((sub_child)=>(
                    <React.Fragment key={sub_child.id}><span class="badge bg-gray my-2" style={{fontSize:"20px"}} onClick={(e)=>{this.categorie_filter(sub_child)}}>{sub_child.name}</span> <br/></React.Fragment>
                    ))}
                    </div>
                  </div>
                )
                })}

              </div>
            )
            })}
          </OwlCarousel>
        </div>
        </React.Fragment>
      )
  }
  categorie_filter=(cat)=>{
    reactLocalStorage.set('selected_cat', cat.id);
    document.getElementById('shop-link').click();
    // setTimeout(()=>{$('#selected_cat').html(`${cat.id}`);},200)
    ;
  }
}

export default Categories ;
