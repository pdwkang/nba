import React, {Component} from 'react';
import ArtistsAction from '../actions/ArtistsAction.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

class EachArtist extends Component {
	render(){
		return(
			<div>{this.props.artist.name}</div>
		)
	}
}

class Artists extends Component {  
	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this)
	}
	componentDidMount() {
		this.props.ArtistsAction();
	}
  	render() {
  		
  		var artists = []
      	if(this.props.artists !== null){
        	this.props.artists.artists.map((artist,index) => {
          		artists.push(
          			<EachArtist artist={artist} key={index}/>
          		)
          		return "STUPID WARNINGGGGGGGG"
          	})
        }	
        return (
			<div className="account-form-wrapper">
				{artists}
			</div>
        );
        // console.log(artists)
    }
}

function mapStateToProps(state){
  // console.log(state.account)
  // console.log(state.artists)
	return{
		artists:state.artists
  	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    ArtistsAction
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
