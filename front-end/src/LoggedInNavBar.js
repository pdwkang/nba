import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import LogOutAction from './actions/LogOutAction.js';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';


class LoginNavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    handleLogOut() {
        this.props.logOut(this.props.user.token)
        hashHistory.push('/');
    }    
    render() {
        return (
        	<div className='sign-in-nav-bar-wrapper'>
                <div className='logo'><Link to='/'>Home</Link></div>
                <div className='search-bar-wrapper'>
                    <Link to={'/artists'}>Rankings</Link>
                    <Link to={'/bracket/' + this.props.user.username}>My Bracket</Link>
                    <Link to={'/account/' + this.props.user.username}>My Account</Link>
                    <Link style={{cursor:'pointer'}} onClick={this.handleLogOut}>Log Out</Link>&nbsp; &nbsp; 
                </div>
        	</div>
        );
    }
}



// go to all. like the array map function
function mapStateToProps(state){
  console.log('logged in')
    return{
        user: state.login
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut: LogOutAction
    }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginNavBar);
// export default App;
// <LoginComponent renderThis={this.state.logInOrOut}/>