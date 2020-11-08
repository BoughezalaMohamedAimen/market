import React from 'react';
import Item from './Item'

class List extends React.Component {

  state={
    products:[],
    selected_product:0,
    selected_attr:[],
  }
  render() {
    return(
      <React.Fragment>
      <div className="container">
        <div className="row">
          {this.props.state.posts.map((post)=>(
              <Item post={post} shared={this.props.shared} getCart={this.props.getCart} />
          ))}
        </div>
      </div>

      </React.Fragment>
      )
  }



}

export default List ;
