import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import Urls from './components/classes/Urls';

import Categories from './components/categories/Categories';
import Cart from './components/cart/Cart';
import Account from './components/account/Account';
import LoginForm from './components/account/LoginForm';
import Shop from './components/shop/Shop';
import Home from './components/home/Home';


import Header from './layouts/Header';
import Footer from './layouts/Footer';

import {reactLocalStorage} from 'reactjs-localstorage';

import $ from "jquery";

const axios=require('axios')

class App extends React.Component {

  componentDidMount(){
      this.auth()
      this.get_categories()
      this.get_attributes()
      this.get_regions()

  }

  state={
    shared_state:{
      urls:new Urls(),
      cart:[],
      categories:[],
      attributes:[],
      regions:[],
      user:{}
    }
  }

  render() {
    return(
      <React.Fragment>
        <Router>
        <Header state={this.state.shared_state}/>
        <div  id="newState" onClick={(e)=>{this.set_state()}}></div>
        <div  id="sharedState">{JSON.stringify(this.state.shared_state)}</div>

         <Switch>
           <Route exact path="/">
            <Home/>
           </Route>
           <Route exact path="/categories">
            <Categories state={this.state.shared_state}/>
           </Route>
           <Route exact path="/cart">
            <Cart state={this.state.shared_state}/>
           </Route>
           <Route exact path="/account">
             <Account state={this.state.shared_state} getCart={this.get_cart}/>
           </Route>
           <Route exact path="/shop">
             <Shop state={this.state.shared_state} getCart={this.get_cart}/>
           </Route>
         </Switch>
         <Footer state={this.state.shared_state}/>
       </Router>
      </React.Fragment>
      )
  }

  auth=()=>{
    var token=reactLocalStorage.get('token')

    if (token!=null)
    {
      axios.get(this.state.shared_state.urls.verify, { headers: { Authorization: `Token ${reactLocalStorage.get('token')}` } })
      .then(response => {
        console.log("response***** is authenticated *****************");
        console.log(response);
          if(response.status==200)
          {
            console.log("response******** is authenticated 200 data **************");
            console.log(response.data);
            this.get_cart()
          }
          else
          {
            reactLocalStorage.remove('token');
            this.get_session()
          }
       })
      .catch((error) => {
          console.log('error init auth ' + error);
       });
    }else{this.get_session()}
  }

  get_session=()=>{
      var session=reactLocalStorage.get('session')

      if (session!=null)
      {
         axios.post(this.state.shared_state.urls.is_session_valid, {
            session: session,
          })
        .then(response => {
          console.log("response***** sessions post *****************");
          console.log(response);
            if(response.status==200)
            {
              console.log("response sessions post 200  data**********************");
              console.log(response.data);
              if(!response.data.is_valid)
              this.new_session()
              else
              this.get_cart()
            }
         })
        .catch((error) => {
            console.log('error validating session ' + error);
         });
      }
      else
      this.new_session()

  }

  new_session=()=>{
    axios.get(this.state.shared_state.urls.new_session,{timeout:5000,})
    .then(response => {
      console.log("response**** sessions get ******************");
      console.log(response);
        if(response.status==200)
        {
          console.log("response sessions get 200 data **********************");
          console.log(response.data);
          reactLocalStorage.set('session', response.data.session);
          this.get_cart()
        }
     })
    .catch((error) => {
        console.log('error creating session' + error);
     });
  }

  set_state=()=>{
      this.setState({shared_state:JSON.parse(document.getElementById("newState").innerHTML)})
  }

  get_attributes=async()=>{
    await axios.get(this.state.shared_state.urls.attributes,{timeout:5000,})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ shared_state: { ...this.state.shared_state, attributes: response.data} });
      }
    })
    .catch(err=>{console.log(err)})
  }

  get_regions=async()=>{
    await axios.get(this.state.shared_state.urls.pays,{timeout:5000,})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ shared_state: { ...this.state.shared_state, regions: response.data} });
      }
    })
    .catch(err=>{console.log(err)})
  }


  get_cart=()=>{
      // Authorization: `Token ${token}`
      var token= reactLocalStorage.get('token')
      if(token!=null)
      {
        this.get_cart_from_server(token)
        this.get_user(token)
      }else{
        this.get_cart_from_server("",reactLocalStorage.get('session'))
      }
  }

  get_cart_from_server=async(token,session="")=>{
    if(token=="")
    {
      await axios.get(this.state.shared_state.urls.cart+`?ses=${session}`,{timeout:5000})
      .then(response=>{
        if(response.status==200)
          this.setState({ shared_state: { ...this.state.shared_state, cart: response.data} });
      })
      .catch(err=>{console.log(err)})
    }
    else
    {
      await axios.get(this.state.shared_state.urls.cart,{timeout:5000,headers:{Authorization: `Token ${token}`}})
      .then(response=>{
        if(response.status==200)
          this.setState({ shared_state: { ...this.state.shared_state, cart: response.data} });
      })
      .catch(err=>{console.log(err)})
    }
  }

  get_cart_from_local=()=>{
    console.log("from local");
      var cart=reactLocalStorage.get('cart');
      if (cart!=null){
        this.setState({ shared_state: { ...this.state.shared_state, cart: cart} })
      }
  }

  get_user=async(token)=>{
    await axios.get(this.state.shared_state.urls.user,{timeout:5000,headers:{Authorization: `Token ${token}`}})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ shared_state: { ...this.state.shared_state, user: response.data} });
        console.log("the user is ");
        console.log(response.data);
      }
    })
    .catch(err=>{console.log(err)})
  }

  get_categories=async()=>{
    await axios.get(this.state.shared_state.urls.categories,{timeout:5000,})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ shared_state: { ...this.state.shared_state, categories: response.data} });
      }
    })
    .catch(err=>{console.log(err)})
  }




}

export default App ;
