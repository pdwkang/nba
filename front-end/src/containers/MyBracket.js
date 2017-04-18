import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import SubmitBracket from '../actions/SubmitBracket.js'
import JustBracketForm from '../containers/JustBracketForm.js'
import JustBracket from '../containers/JustBracket.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link} from 'react-router'


class MyBracket extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render(){
    
    var bracket = JSON.parse(this.props.user.data[0].bracket)
    return(
      <div>
        <JustBracket bracket={bracket}/>
      </div>
    )
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
    FetchAccount:FetchAccount,
    SubmitBracket:SubmitBracket
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBracket);
