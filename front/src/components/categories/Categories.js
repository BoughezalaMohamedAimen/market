import React from 'react';

import $ from "jquery";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



const axios=require('axios')


class Categories extends React.Component {

  shared_state={}



  componentDidMount(){

  }

  render() {
    return(
        <div class="container py-5 my-5">
          <OwlCarousel className="owl-theme" loop margin={10} nav={false} items={1}>
            {this.props.state.categories.map((cat)=>{
              return (
              <div className="item">
                <div className="container">
                  <h1 className="text-center bg-day text-white rounded"> {cat.name}</h1>
                </div>
              </div>
            )
            })}
          </OwlCarousel>
        </div>
      )
  }
}

export default Categories ;
