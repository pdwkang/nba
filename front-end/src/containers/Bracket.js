import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import BracketForm from './BracketForm.js'
import MyBracket from './MyBracket.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
class Bracket extends Component {
  constructor(props) {
    super(props);
    this.state={
      WhatToRender:''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
    componentDidMount() {
      this.props.FetchAccount(this.props.params.username);
      // console.log(this.props.params.username)
        if(this.props.user.data[0].submitted === 'yes'){
          console.log(this.props.user.data[0].submitted)
          this.setState({
            WhatToRender: <MyBracket/>
          })
        }else{
          console.log(this.props.user.data[0].submitted)
          this.setState({
            WhatToRender: <BracketForm/>
          })
        }
      
    }     
    render() {
      // var accountName = ''
      // if(this.props.account.results !== undefined){
      //         accountName = this.props.account.results[0].name
      //       }else{
      //         accountName = ''
      //       }
        return (
          <div className="account-form-wrapper">
             {this.state.WhatToRender}
          </div>
        );
    }
}

function mapStateToProps(state){
  // console.log(state.account)
  console.log(state.login)
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

export default connect(mapStateToProps, mapDispatchToProps)(Bracket);
