import React, {Component} from 'react';
import FetchAccount from '../actions/FetchAccount.js'
import UpdateProfile from '../actions/UpdateProfile.js'
import ProfilePic from '../actions/ProfilePic.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Link} from 'react-router'

class ArtistAccount extends Component {  
	constructor(props) {
		super(props);
		this.state = {
			profilepic:'http://localhost:3000/images/avatar.jpg',
            uploading:''
		}
		this.handleProfilePic = this.handleProfilePic.bind(this)
		this.updateProfile = this.updateProfile.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
	}
	componentDidMount() {
		this.setState({
			profilepic:'http://localhost:3000/images/' + this.props.user.data[0].photo	
		})
	}
	handleProfilePic(event){
		event.preventDefault();
		let profileImg = event.target.elements[0].files[0];
		this.props.ChangeProfilePic({
			profileImg : profileImg,
			token: this.props.user.data[0].token
		})
        this.setState({
            uploading:'Uploading Picture'
        })
        location.reload();
	}
    updateProfile(event) {
        event.preventDefault();
        let name = event.target.elements[0].value;
        if(!name){name = event.target.elements[0].placeholder}
        let email = event.target.elements[1].value;
    	if(!email){email = event.target.elements[1].placeholder}
        let bio = event.target.elements[2].value;
    	if(!bio){
    		if(event.target.elements[2].placeholder==='Tell a little about yourself'){
    			bio=''
    		}else{
    			bio=event.target.elements[2].placeholder
    		}
    	}
        let city = event.target.elements[3].value
    	if(!location){
    		if(event.target.elements[3].placeholder==='Where are you located?'){
    			city=''
    		}else{
    			city=event.target.elements[3].placeholder
    		}
    	}
        // console.log(name)
        // console.log(email)
        // console.log(location)
        // console.log(bio)
        this.props.UpdateProfile({
            token: this.props.user.token,
            name:name,
            email:email,
            bio:bio,
            location:city
        });
        location.reload();
    }	
	render() {
		var name = this.props.user.data[0].name
		if(!name){name='Enter your name'}
		var email = this.props.user.data[0].email
		if(!email){email='Enter your email'}
		var bio = this.props.user.data[0].bio
		if(!bio){bio='Tell a little about yourself'}
		var city = this.props.user.data[0].location
		if(!city){city='Where are you located?'}
		return (
			<div className="my-account-page">
				<div className='col-sm-6 col-sm-offset-1'>
				<Form
                    encType='multipart/form-data'
                    onSubmit={this.updateProfile}>

                    <FormGroup controlId="formControlsText" >
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder={name}/>
                    </FormGroup>

                    <FormGroup controlId="formControlsText" >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder={email}/>
                    </FormGroup>                    

                    <FormGroup controlId="formControlsTextarea" >
                        <ControlLabel>Bio</ControlLabel>
                        <FormControl
                            componentClass="textarea" rows='5'
                            placeholder={bio}/>
                    </FormGroup>

                    <FormGroup controlId="formControsText" >
                        <ControlLabel>Location</ControlLabel>
                        <FormControl
                            type='text'
                            placeholder={city}/>
                    </FormGroup>
                    <FormControl className='btn dark-button' type="submit" value='Update Profile'/>
                </Form>
                </div>
                <div className='col-sm-4'>
				<Form onSubmit={this.handleProfilePic}>
					<FormGroup controlId="formControlsFile">
	                    <ControlLabel>Profile Picture</ControlLabel>
	                    <img className='profileImage' src={this.state.profilepic} alt='a'/>
	                    <FormControl className='uploadProfile' type="file" />
	                    <FormControl className='btn dark-button' type="submit" value='Change Profile Picture'/>
                        <span className='uploading'>{this.state.uploading}</span>
					</FormGroup>
				</Form>
				</div>
                <Link to='myArtwork'>Sell Your Art</Link>
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
    ChangeProfilePic:ProfilePic,
    UpdateProfile:UpdateProfile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistAccount);
