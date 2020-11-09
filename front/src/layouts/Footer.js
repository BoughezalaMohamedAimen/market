import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import StorefrontIcon from '@material-ui/icons/Storefront';
import $ from "jquery";

class Footer extends React.Component {
  render() {
    return(
      <div className="shadow fixed-bottom bg-night text-white border-top">
        <div className="container py-1 text-center">

          <div className="row">
            <div className="col-3 text-center">
            <Link to="/">
            <IconButton edge="start"  className="menu-button" color="inherit" aria-label="menu" style={{outline:0}} onClick={(e)=>{$('.active-menu').removeClass('active-menu');e.target.classList.add("active-menu");}}>
              <StorefrontIcon />
            </IconButton>
            </Link>
            </div>
            <div className="col-3">
            <Link to="/account">
            <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}} onClick={(e)=>{$('.active-menu').removeClass('active-menu');e.target.classList.add("active-menu");}}>
              <AccountCircleIcon />
            </IconButton>
            </Link>
            </div>
            <div className="col-3 ">
            <Link to="/cart">
            <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}} onClick={(e)=>{$('.active-menu').removeClass('active-menu');e.target.classList.add("active-menu");}}>
              <ShoppingBasketIcon />
            </IconButton>
            </Link>
            </div>
            <div className="col-3 ">
            <Link to="/shop">
            <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}} onClick={(e)=>{$('.active-menu').removeClass('active-menu');e.target.classList.add("active-menu");}}>
              <ListAltIcon />
            </IconButton>
            </Link>
            </div>
          </div>
        </div>
      </div>
      )
  }
}

export default Footer ;
