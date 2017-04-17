import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import LogOutAction from './actions/LogOutAction.js';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';


class SignUpNavBar extends Component {
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
                    <Link to="/login">Sign In</Link> or
                    <Link to="/register">Register</Link>
                </div>
        	</div>
        );
    }
}



// go to all. like the array map function
function mapStateToProps(state){
  console.log(state.login)
    return{
        user: state.login
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut: LogOutAction
    }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUpNavBar);
// export default App;
// <LoginComponent renderThis={this.state.logInOrOut}/>