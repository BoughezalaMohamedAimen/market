// import HmacMD5 from "crypto-js/hmac-md5";

// const axios=require('axios')

class Urls  {
  constructor(token){
    const url="http://192.168.1.23:8000"
    this.token=token
    this.categories=`${url}/categories/api`
    this.attributes=`${url}/posts/atrr/api`
    this.cart=`${url}/cart/api`
    this.add_to_cart=`${url}/cart/api/add`
    this.auth=`${url}/api-auth/`
    this.pays=`${url}/pays/api`
    this.shop=`${url}/posts/api`
    this.user=`${url}/accounts/api`
    this.is_session_valid=`${url}/accounts/api/session/validation`
    this.new_session=`${url}/accounts/api/session/new`
    this.register=`${url}/accounts/api/register`
    this.verify=`${url}/accounts/api/verify/`
  }


}

export default Urls
