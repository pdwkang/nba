import React, {Component} from 'react';
import ArtistData from '../actions/ArtistData.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap';
import AddArtwork from '../actions/AddArtwork';
var Sidebar = require('react-sidebar').default;

class MyArtwork extends Component {  
	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this)
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
        this.addArtwork = this.addArtwork.bind(this);
		this.state = {
			sidebarOpen: false,
		}
	}
	componentDidMount(){
		this.props.ArtistData(this.props.user.id)
	}
	onSetSidebarOpen(open){
		this.setState({
			sidebarOpen:open
		})
	}
    addArtwork(event) {
        event.preventDefault();
        let title = event.target.elements[0].value;
        let imgFile = event.target.elements[1].files[0];
        let description = event.target.elements[2].value;
        let buyNow = event.target.elements[3].valueAsNumber;
        let startPrice = event.target.elements[4].valueAsNumber;
        let auctionEnd = Math.floor((event.target.elements[5].valueAsNumber) / 1000);
        let auctionStart = Math.floor(Date.now() / 1000);
        let tags = event.target.elements[6].value;
        console.log(this.props.artistData.artist[0].id)
        this.props.AddArtwork({
            title: title,
            imgFile: imgFile,
            description: description,
            startPrice: startPrice,
            auctionEnd: auctionEnd,
            auctionStart: auctionStart,
            buyNow:buyNow,
            id:this.props.artistData.artist[0].id,
            tags:tags
        });

    }	
	render() {
		var sidebarContent = <div className='side-bar-content'>
			<Form
                encType='multipart/form-data'
                onSubmit={this.addArtwork}>
                <FormGroup controlId="formControlsText" >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter title" />
                </FormGroup>

                <FormGroup controlId="formControlsFile">
                    <ControlLabel>Upload Image</ControlLabel>
                    <FormControl
                        type="file" />
                </FormGroup>

                <FormGroup controlId="formControlsTextarea" >
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        componentClass="textarea" rows='4'
                        placeholder="Add description" />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Buy Now Price</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                            <FormControl type="number" step="1"/>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Starting Bid Price</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                            <FormControl type="number" step="1"/>
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="formControlsDate" >
                    <ControlLabel>Auction Expiration Date</ControlLabel>
                    <FormControl
                        type="date" />
                </FormGroup>

                <FormGroup controlId="formControlsText" >
                    <ControlLabel>Tags</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="e.g. Acrylic Painting, Flowers, Abstract" />
                </FormGroup>                

                <FormGroup>
                    <Button style={{color:'black'}} bsStyle="warning" bsSize="small" type="submit">
                        Submit
                    </Button>
                </FormGroup>
            </Form>
		</div>

		if(this.props.artistData !== null){
			// console.log(this.props.artistData.items)
			var imageHTML = []
			this.props.artistData.items.map((item, index)=>{
				let routedUrl = `/products/${item.id}`
				imageHTML.push(
					<Link className='col-sm-4 col-md-3' key={index} to={routedUrl}><img src={'http://localhost:3000/images/' + item.image_url} alt='a'/></Link>
				)				
				return 'i love react'
			})
		}		
		return(

				<Sidebar sidebar={sidebarContent}
					open={this.state.sidebarOpen} 
					dragToggleDistance={500}
					onSetOpen={this.onSetSidebarOpen} 
					pullRight={true}
					styles={{overlay:{backgroundColor:'transparent'}}}>
					<b>
						<div className='artwork-wrapper'>
							{imageHTML}
						</div>
						<div className='add-item' onClick={this.onSetSidebarOpen}>Add Item</div>
					</b>
				</Sidebar>

		)
	}
}

function mapStateToProps(state){
	return{
		user:state.login.data[0],
		artistData:state.artistData
  	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		ArtistData:ArtistData,
		AddArtwork:AddArtwork
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyArtwork);
