import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';




class Header extends React.Component {

  render() {

    const categorie=document.getElementById("categorie-tab");
    return(
      <div className="fixed-top shadow bg-light top-bar">
      <div className="container">
        <div className="row">
          <div className="col-6 border-right">
          <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}}>
            <MenuIcon onClick={(e)=>{
              if(document.getElementById("categorie-tab").classList.contains('hidden'))
               document.getElementById("categorie-tab").classList.remove('hidden');
                else
                document.getElementById("categorie-tab").classList.add('hidden');
              }}/>
          </IconButton>

          <Link to="/">
          <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}}>
            <HomeIcon />
          </IconButton>
          </Link>


          </div>
          <div className="col-4">

          <Link to="/account">
          <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}}>
            <AccountCircleIcon />
            <small>  {this.props.state.user.username} </small>
          </IconButton>
          </Link>
          </div>

          <div className="col-2">
          <IconButton edge="start"  color="inherit" aria-label="menu" style={{outline:0}}>
            <SearchIcon />
          </IconButton>
          </div>


        </div>
      </div>

      </div>
      )
  }
}

export default Header ;
