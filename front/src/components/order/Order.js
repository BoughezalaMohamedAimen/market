import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';


class Order extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className="py-2 bg-blue h4 text-center text-white mb-0"> NEW ORDER PAGE</div>
        <div className="text-right   py-3"><span className="p-3 bg-night text-white"> TOTAL SANS LIVRAISON: {reactLocalStorage.get('totalcart')} DA</span></div>
      </React.Fragment>
      )
  }
}

export default Order ;
