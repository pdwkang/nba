import React, { Component } from 'react';
import { Link } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

class EachItemInFrontPage extends Component {
    render() {
      var routedUrl = `/products/${this.props.item.id}`
      return(
        <div className='each-item-wrapper col-sm-6'>
          <div className='each-item-image'>
            <Link to={routedUrl}>
              <img alt='a' src={'http://localhost:3000/images/' + this.props.item.image_url}/>
            </Link>
          </div>
          <div className='each-item-description '>
            {this.props.item.name}
          </div>
        </div>
      )
    }
}

// function mapStateToProps(state){
  // return{
  //   items: state.getItem
  // }
// }

// function mapDispatchToProps(dispatch){
  // return bindActionCreators({
  //   FetchItems
  //   // FetchItems: FetchItems
  // }, dispatch)
// }
export default EachItemInFrontPage
// export default connect(mapStateToProps, mapDispatchToProps)(EachItemInFrontPage);
