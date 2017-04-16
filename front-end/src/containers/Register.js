import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterAction from '../actions/RegisterAction.js';
import { hashHistory } from 'react-router';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registrationResponse: "",
			passwordMatchString: '',
			name: '',
			job:'user'
		}
        this.registerInformation = this.registerInformation.bind(this);
        this.handleJob = this.handleJob.bind(this);
    }
    handleJob(){
    	this.setState({
    		job:'artist'
    	})
    }
	registerInformation(event){
		event.preventDefault();
		var name = event.target[0].value.toUpperCase();
		var email = event.target[1].value;
		var userName = event.target[2].value;
		var passwordConfirmation = event.target[3].value;
		var password = event.target[4].value; //password being saved in database
		if(password === passwordConfirmation){
			this.props.registerAction({
				name: name,
				email: email,
				username: userName,
				password: password,
				job:this.state.job
			});			
			this.setState({
				passwordMatchString: '',
				name: name
			})
			hashHistory.push('/');					
		}else{
			this.setState({
				passwordMatchString: 'Passwords do not match'
			})
		}
	
	}
	render(){
		var message
		if(this.props.registerResponse.msg === 'userNameTaken'){
			message = 'User Name is Taken'
		}else if(this.props.registerResponse.msg === 'userInserted'){
			message = 'Welcome, ' + this.state.name
		}else{
			message = ''
		}
		var passwordMatchString = this.state.passwordMatchString
		return(
			<div style={{margin:'auto', width:'100%', textAlign:'center'}}>
				<div className="register-form-wrapper">
					<br/>
					<div className='register-form-header'>
						User Sign Up<br/>
						<span className='register-form-description'>
							Fill in the form below to get instant access
						</span>
					</div>
					<form className="text-center register-form" onSubmit={this.registerInformation} >
						<input className="form-control" type="text" required name="name" placeholder="Full Name" />
						<input className="form-control" type="email" required name="email" placeholder="Email" />
						<input className="form-control" type="text" required name="username" placeholder="Username" />
						<input className="form-control" type="password" required placeholder="Password" />
						<input className="form-control" type="password" required name="password" placeholder="Repeat Password" />
						{passwordMatchString}
						<button className="btn btn-primary" type="submit" value="Register">Register</button>
						<h1>{message}</h1>
					</form>
				</div>
				<div style={{width:50, display:'inline-block'}}></div>
				<div className="register-form-wrapper-artist">
					<br/>
					<div className='register-form-header'>
						Artist Sign Up<br/>
						<span className='register-form-description'>
							Fill in the form below to sell your artwork!
						</span>
					</div>
					<form className="text-center register-form" onSubmit={this.registerInformation} >
						<input className="form-control" type="text" required name="name" placeholder="Full Name" />
						<input className="form-control" type="email" required name="email" placeholder="Email" />
						<input className="form-control" type="text" required name="username" placeholder="Username" />
						<input className="form-control" type="password" required placeholder="Password" />
						<input className="form-control" type="password" required name="password" placeholder="Repeat Password" />
						{passwordMatchString}
						<button className="btn btn-primary" type="submit" onClick={this.handleJob} value="Register">Register</button>
						<h1>{message}</h1>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		registerResponse: state.register
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
