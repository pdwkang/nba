import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import SubmitBracket from '../actions/SubmitBracket.js'
import JustBracket from '../containers/JustBracketForm.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link} from 'react-router'


class BracketForm extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      
        teams:['GSW','POR','LAC','UTA','SAS','MEM','HOU','OKC','BOS','CHI','WSH','ATL','CLE','IND','TOR','MIL'],
        // West First Round
        w11:{winner:'',game:0},
        w12:{winner:'',game:0},
        w13:{winner:'',game:0},
        w14:{winner:'',game:0},

        e11:{winner:'',game:0},
        e12:{winner:'',game:0},
        e13:{winner:'',game:0},
        e14:{winner:'',game:0},

        w21:{winner:'',game:0},
        w22:{winner:'',game:0},

        e21:{winner:'',game:0},
        e22:{winner:'',game:0},

        w3:{winner:'',game:0},

        e3:{winner:'',game:0},

        finals:{winner:'',tieBreaker:''},

      
    }
    this.handle1W1 = this.handle1W1.bind(this);
    this.handle2W1 = this.handle2W1.bind(this);
    this.handle3W2 = this.handle3W2.bind(this);
    this.handle4W2 = this.handle4W2.bind(this);
    this.handle5W3 = this.handle5W3.bind(this);
    this.handle6W3 = this.handle6W3.bind(this);
    this.handle7W4 = this.handle7W4.bind(this);
    this.handle8W4 = this.handle8W4.bind(this);
    
    this.handle1E1 = this.handle1E1.bind(this);
    this.handle2E1 = this.handle2E1.bind(this);
    this.handle3E2 = this.handle3E2.bind(this);
    this.handle4E2 = this.handle4E2.bind(this);
    this.handle5E3 = this.handle5E3.bind(this);
    this.handle6E3 = this.handle6E3.bind(this);
    this.handle7E4 = this.handle7E4.bind(this);
    this.handle8E4 = this.handle8E4.bind(this);

    this.handle9W1 = this.handle9W1.bind(this);
    this.handle10W1 = this.handle10W1.bind(this);
    this.handle11W2 = this.handle11W2.bind(this);
    this.handle12W2 = this.handle12W2.bind(this);

    this.handle9E1 = this.handle9E1.bind(this);
    this.handle10E1 = this.handle10E1.bind(this);
    this.handle11E2 = this.handle11E2.bind(this);
    this.handle12E2 = this.handle12E2.bind(this);

    this.handle13W3 = this.handle13W3.bind(this);
    this.handle14W3 = this.handle14W3.bind(this);
    this.handle13E3 = this.handle13E3.bind(this);
    this.handle14E3 = this.handle14E3.bind(this);

    this.handleWF = this.handleWF.bind(this);
    this.handleEF = this.handleEF.bind(this);

    this.submitBracket = this.submitBracket.bind(this);
  }
  handle1W1(){this.setState({w11:{winner:this.state.teams[0]},w21:'',w3:'',finals:''})}
  handle2W1(){this.setState({w11:{winner:this.state.teams[1]},w21:'',w3:'',finals:''})}
  handle3W2(){this.setState({w12:{winner:this.state.teams[2]},w21:'',w3:'',finals:''})}
  handle4W2(){this.setState({w12:{winner:this.state.teams[3]},w21:'',w3:'',finals:''})}
  handle5W3(){this.setState({w13:{winner:this.state.teams[4]},w22:'',w3:'',finals:''})}
  handle6W3(){this.setState({w13:{winner:this.state.teams[5]},w22:'',w3:'',finals:''})}
  handle7W4(){this.setState({w14:{winner:this.state.teams[6]},w22:'',w3:'',finals:''})}
  handle8W4(){this.setState({w14:{winner:this.state.teams[7]},w22:'',w3:'',finals:''})}
  
  handle9W1(){this.setState({w21:{winner:this.state.w11.winner},w3:'',finals:''})}
  handle10W1(){this.setState({w21:{winner:this.state.w12.winner},w3:'',finals:''})}
  handle11W2(){this.setState({w22:{winner:this.state.w13.winner},w3:'',finals:''})}
  handle12W2(){this.setState({w22:{winner:this.state.w14.winner},w3:'',finals:''})}

  handle1E1(){this.setState({e11:{winner:this.state.teams[8]},e21:'',e3:'',finals:''})}
  handle2E1(){this.setState({e11:{winner:this.state.teams[9]},e21:'',e3:'',finals:''})}
  handle3E2(){this.setState({e12:{winner:this.state.teams[10]},e21:'',e3:'',finals:''})}
  handle4E2(){this.setState({e12:{winner:this.state.teams[11]},e21:'',e3:'',finals:''})}
  handle5E3(){this.setState({e13:{winner:this.state.teams[12]},e22:'',e3:'',finals:''})}
  handle6E3(){this.setState({e13:{winner:this.state.teams[13]},e22:'',e3:'',finals:''})}
  handle7E4(){this.setState({e14:{winner:this.state.teams[14]},e22:'',e3:'',finals:''})}
  handle8E4(){this.setState({e14:{winner:this.state.teams[15]},e22:'',e3:'',finals:''})}

  handle9E1(){this.setState({e21:{winner:this.state.e11.winner},e3:'',finals:''})}
  handle10E1(){this.setState({e21:{winner:this.state.e12.winner},e3:'',finals:''})}
  handle11E2(){this.setState({e22:{winner:this.state.e13.winner},e3:'',finals:''})}
  handle12E2(){this.setState({e22:{winner:this.state.e14.winner},e3:'',finals:''})}

  handle13W3(){this.setState({w3:{winner:this.state.w21.winner},finals:''})}
  handle14W3(){this.setState({w3:{winner:this.state.w22.winner},finals:''})}
  handle13E3(){this.setState({e3:{winner:this.state.e21.winner},finals:''})}
  handle14E3(){this.setState({e3:{winner:this.state.e22.winner},finals:''})}

  handleWF(){this.setState({finals:{winner:this.state.w3.winner}})}
  handleEF(){this.setState({finals:{winner:this.state.e3.winner}})}

  submitBracket(){
    var bracketString = JSON.stringify(this.state)
    console.log(bracketString)
    this.props.SubmitBracket({
          bracket:bracketString,
          token: this.props.user.token
        })
  }
  render() {
    var example_bracket = this.state
    return (
      <div className='bracket-wrapper'>

        <div className='each-team-box' onClick={this.handle1W1} style={{top:0,left:0}}>{example_bracket.teams[0]}</div>
        <div className='each-team-box' onClick={this.handle2W1} style={{top:80,left:0}}>{example_bracket.teams[1]}</div>
        <div className='each-team-box' onClick={this.handle3W2} style={{top:160,left:0}}>{example_bracket.teams[2]}</div>
        <div className='each-team-box' onClick={this.handle4W2} style={{top:240,left:0}}>{example_bracket.teams[3]}</div>
        <div className='each-team-box' onClick={this.handle5W3} style={{top:320,left:0}}>{example_bracket.teams[4]}</div>
        <div className='each-team-box' onClick={this.handle6W3} style={{top:400,left:0}}>{example_bracket.teams[5]}</div>
        <div className='each-team-box' onClick={this.handle7W4} style={{top:480,left:0}}>{example_bracket.teams[6]}</div>
        <div className='each-team-box' onClick={this.handle8W4} style={{top:560,left:0}}>{example_bracket.teams[7]}</div>

        <div className='each-team-box' onClick={this.handle1E1} style={{top:0,right:0}}>{example_bracket.teams[8]}</div>
        <div className='each-team-box' onClick={this.handle2E1} style={{top:80,right:0}}>{example_bracket.teams[9]}</div>
        <div className='each-team-box' onClick={this.handle3E2} style={{top:160,right:0}}>{example_bracket.teams[10]}</div>
        <div className='each-team-box' onClick={this.handle4E2} style={{top:240,right:0}}>{example_bracket.teams[11]}</div>
        <div className='each-team-box' onClick={this.handle5E3} style={{top:320,right:0}}>{example_bracket.teams[12]}</div>
        <div className='each-team-box' onClick={this.handle6E3} style={{top:400,right:0}}>{example_bracket.teams[13]}</div>
        <div className='each-team-box' onClick={this.handle7E4} style={{top:480,right:0}}>{example_bracket.teams[14]}</div>
        <div className='each-team-box' onClick={this.handle8E4} style={{top:560,right:0}}>{example_bracket.teams[15]}</div>

        <div className='each-team-box' onClick={this.handle9W1} style={{top:40,left:150}}>{example_bracket.w11.winner}</div>
        <div className='each-team-box' onClick={this.handle10W1} style={{top:200,left:150}}>{example_bracket.w12.winner}</div>
        <div className='each-team-box' onClick={this.handle11W2} style={{top:360,left:150}}>{example_bracket.w13.winner}</div>
        <div className='each-team-box' onClick={this.handle12W2} style={{top:520,left:150}}>{example_bracket.w14.winner}</div>

        <div className='each-team-box' onClick={this.handle9E1} style={{top:40,right:150}}>{example_bracket.e11.winner}</div>
        <div className='each-team-box' onClick={this.handle10E1} style={{top:200,right:150}}>{example_bracket.e12.winner}</div>
        <div className='each-team-box' onClick={this.handle11E2} style={{top:360,right:150}}>{example_bracket.e13.winner}</div>
        <div className='each-team-box' onClick={this.handle12E2} style={{top:520,right:150}}>{example_bracket.e14.winner}</div>

        <div className='each-team-box' onClick={this.handle13W3} style={{top:120,left:300}}>{example_bracket.w21.winner}</div>
        <div className='each-team-box' onClick={this.handle14W3} style={{top:440,left:300}}>{example_bracket.w22.winner}</div>
        <div className='each-team-box' onClick={this.handle13E3} style={{top:120,right:300}}>{example_bracket.e21.winner}</div>
        <div className='each-team-box' onClick={this.handle14E3} style={{top:440,right:300}}>{example_bracket.e22.winner}</div>

        <div className='each-team-box' onClick={this.handleWF} style={{top:280,left:450}}>{example_bracket.w3.winner}</div>
        <div className='each-team-box' onClick={this.handleEF} style={{top:280,right:450}}>{example_bracket.e3.winner}</div>

        <div className='each-team-box' style={{top:480,left:0,right:0,margin:'auto'}}>{example_bracket.finals.winner}</div>
        <button onClick={this.submitBracket} style={{position:'absolute',top:600,left:0,right:0,margin:'auto'}} type='submit'>Submit</button>
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
    FetchAccount:FetchAccount,
    SubmitBracket:SubmitBracket
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BracketForm);


      // <div className="my-account-page">
      //   <div className='col-sm-6 col-sm-offset-1'>
      //   <Form
      //               encType='multipart/form-data'
      //               onSubmit={this.updateProfile}>

                    // <FormGroup controlId="formControlsText" >
                    //     <ControlLabel>Name</ControlLabel>
                    //     <FormControl
                    //         type="text"
                    //         placeholder={name}/>
                    // </FormGroup>

      //               <FormGroup controlId="formControlsText" >
      //                   <ControlLabel>Email</ControlLabel>
      //                   <FormControl
      //                       type="text"
      //                       placeholder={email}/>
      //               </FormGroup>                    

      //               <FormGroup controlId="formControlsTextarea" >
      //                   <ControlLabel>Bio</ControlLabel>
      //                   <FormControl
      //                       componentClass="textarea" rows='5'
      //                       placeholder={bio}/>
      //               </FormGroup>

      //               <FormGroup controlId="formControsText" >
      //                   <ControlLabel>Location</ControlLabel>
      //                   <FormControl
      //                       type='text'
      //                       placeholder={city}/>
      //               </FormGroup>
                    // <FormControl className='btn dark-button' type="submit" value='Update Profile'/>
      //           </Form>
      //           </div>
                
      // </div>