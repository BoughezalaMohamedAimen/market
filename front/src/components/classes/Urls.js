// import HmacMD5 from "crypto-js/hmac-md5";

// const axios=require('axios')

class Urls  {
  constructor(token){
    // this.url="https://market.powertech-dz.net"
    this.url="http://192.168.1.11:8000"
    this.token=token
    this.categories=`${this.url}/categories/api`
    this.attributes=`${this.url}/posts/atrr/api`
    this.cart=`${this.url}/cart/api`
    this.add_to_cart=`${this.url}/cart/api/add`
    this.cart_qtt=`${this.url}/cart/api/qtt/`
    this.delete_from_cart=`${this.url}/cart/api/delete/`
    this.auth=`${this.url}/api-auth/`
    this.pays=`${this.url}/pays/api`
    this.shop=`${this.url}/posts/api`
    this.single_post=`${this.url}/posts/api/`
    this.user=`${this.url}/accounts/api`
    this.is_session_valid=`${this.url}/accounts/api/session/validation`
    this.new_session=`${this.url}/accounts/api/session/new`
    this.register=`${this.url}/accounts/api/register`
    this.verify=`${this.url}/accounts/api/verify/`
  }


}

export default Urls
