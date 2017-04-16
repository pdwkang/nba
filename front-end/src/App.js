import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoggedInNavBar from './LoggedInNavBar.js';
import SignUpNavBar from './SignUpNavBar.js';

class App extends Component {
    render() {
        return (
            <div className='ebay-wrapper'>
            	{this.props.loggedIn}
            	<div className='body-wrapper'>
                    {this.props.children}
            	</div>
			</div>
        );
    }
}



// go to all. like the array map function
function mapStateToProps(state){
  // console.log('############')
  // console.log(state.login)
  // console.log('############')
  if(state.login.token){
    return{
        loggedIn: <LoggedInNavBar/>
    }
  }else{
    return{
        loggedIn: <SignUpNavBar/>
    }
  }
}


export default connect(mapStateToProps)(App);