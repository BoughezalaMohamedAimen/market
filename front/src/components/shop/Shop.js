import React from 'react';
import List from './List';


const axios=require('axios');

class Shop extends React.Component {
  state={
    selected_cat:0,
    posts:[]
  }

  componentDidMount(){
    this.get_posts()
  }

  render() {
    // {this.state.posts.map(post=>{return post.title})}
    return(
      <div class="container-fluid py-2 bg-darkgray">
          <List state={this.state} shared={this.props.state} getCart={this.props.getCart} />
      </div>
      )
  }

  get_posts=async()=>{
    await axios.get(this.props.state.urls.shop,{timeout:5000,})
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ posts:response.data.result});
        console.log("posts api data ");
        console.log(response.data);
      }
    })
    .catch(err=>{console.log(err)})
  }
}

export default Shop ;
