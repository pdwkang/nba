import React, {Component} from 'react';
import EachItemInFrontPage from '../containers/EachItemInFrontPage.js'
import FetchItems from '../actions/FetchItems.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount() {
    	this.props.FetchItems();
    }
    render() {
      if(this.props.items !== null){
        var items = []
        this.props.items.results.map(value => {
          items.push(<EachItemInFrontPage item={value} key={value.id}/>)
          return "STUPID WARNINGGGGGGGG"
        })

      }
      return (
  			<div className='body-content-wrapper'>
      		{items}
      	</div>
        );
    }
}

// go to all. like the array map function
function mapStateToProps(state){
  // console.log(state.login)
	return{
		items: state.getItem
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		FetchItems
		// FetchItems: FetchItems
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);