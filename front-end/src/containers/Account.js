import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import ArtistAccount from './ArtistAccount.js'
import UserAccount from './UserAccount.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state={
      job:''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
    componentDidMount() {
      this.props.FetchAccount(this.props.params.username);
      // console.log(this.props.params.username)
        if(this.props.user.data[0].job === 'artist'){
          this.setState({
            job: <ArtistAccount/>
          })
        }else{
          this.setState({
            job: <UserAccount/>
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
             {this.state.job}
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
