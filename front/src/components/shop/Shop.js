import React from 'react';
import List from './List';
import $ from "jquery";
import {reactLocalStorage} from 'reactjs-localstorage';


const axios=require('axios');

class Shop extends React.Component {
  state={
    selected_cat:0,
    posts:[]
  }

  componentDidMount(){

    setTimeout(()=>{this.get_posts(this.props.match.params.slug)},100)


  }

  render() {
    // {this.state.posts.map(post=>{return post.title})}
    return(
      <React.Fragment>
      <div className="d-none" id="categorie-filter" onClick={(e)=>{this.get_posts_by_category()}}></div>
      <div className="py-2 bg-blue h4 text-center text-white mb-0"> SHOP</div>
      <div class="container-fluid py-2 bg-darkgray">
          <List state={this.state} shared={this.props.state} getCart={this.props.getCart} />
      </div>
      </React.Fragment>
      )
  }

  get_posts=async(categorie_id=0)=>{
    console.log(`the state is ${this.state.selected_cat}`);
    const url=(categorie_id!=0) ? this.props.state.urls.shop+`?cat=${categorie_id}` : this.props.state.urls.shop
    await axios.get(url)
    .then(response=>{
      if(response.status==200)
      {
        this.setState({ posts:response.data.result});
        // console.log("posts api data ");
        // console.log(response.data);
      }
    })
    .catch(err=>{console.log(err)})
  }
  get_posts_by_category=async()=>{
    // alert(document.getElementById('selected_cat').innerHTML)
    const selected_cat=parseInt($('#selected_cat').html())
    this.setState({selected_cat:selected_cat})
    setTimeout(()=>{this.get_posts(selected_cat)},500)
  }
}

export default Shop ;
