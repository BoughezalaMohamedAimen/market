import React from 'react';

import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import Register from './Register';

class Account extends React.Component {

  render() {
    if (JSON.stringify(this.props.state.user) != JSON.stringify({}))
    return(
      <React.Fragment>
      <div className="py-2 bg-blue h4 text-center text-white mb-0"> ACCOUNT</div>
      
        <ProfileForm state={this.props.state}/>
      <br/><br/><br/><br/><br/>
        <Register state={this.props.state}/>
      </React.Fragment>
      )
      else
      return(
        <React.Fragment>
        <div className="py-2 bg-blue h4 text-center text-white mb-0"> LOGIN</div>
        <LoginForm getCart={this.props.getCart} />
        </React.Fragment>
      )
  }
}

export default Account ;
