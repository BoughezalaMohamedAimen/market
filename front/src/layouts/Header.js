import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import logo from '../images/logoo.png'

// <img src={logo} className="logo center-absolute" />

class Header extends React.Component {

  render() {

    return(
      <React.Fragment>
      <div className="top-bar"></div>
      <div className="shadow bg-night fixed-top">
        <div className="container">

          <div className="row">
            <div className="col-2 text-white bg-night py-1">
            <Link to="/categories">
              <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}} onClick={(e)=>{}}>
                <MenuIcon />
              </IconButton>
            </Link>
            </div>
            <div className="col-8 py-1">
              <img src={logo} className="logo center-absolute" />
            </div>
            <div className="col-2 text-right text-white bg-night py-1">
            <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}}>
              <SearchIcon />
            </IconButton>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>


      )
  }
}

export default Header ;
