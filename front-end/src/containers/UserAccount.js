import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

class UserAccount extends Component {
    render() {
      // var accountName = ''
      // if(this.props.account.results !== undefined){
      //         accountName = this.props.account.results[0].name
      //       }else{
      //         accountName = ''
      //       }
        return (
          <div className="account-form-wrapper">
             {this.props.user.data[0].job}
          </div>
        );
    }
}

function mapStateToProps(state){
  // console.log(state.account)
  // console.log(state.login)
  return{
    account: state.account,
    user: state.login
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    FetchAccount
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
