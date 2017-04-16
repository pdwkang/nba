import React, {Component} from 'react';
import FetchItemDetails from '../actions/FetchItemDetails.js'
import SubmitBidAction from '../actions/SubmitBidAction.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class Product extends Component {
  constructor(props) {
      super(props);
      this.submitBid = this.submitBid.bind(this);
  }
  componentDidMount() {
    this.props.FetchItemDetails(this.props.params.id);
    }
    submitBid(event){
    event.preventDefault();

    if(this.props.userToken === undefined){
      // go back to log in page
    }else{
      var bidAmount = event.target[0].value;
      var auctionItem = this.props.item.results[0]
      if(auctionItem.current_bid === null){
        auctionItem.current_bid = auctionItem.starting_bid - 0.01;
      }
      if(bidAmount < auctionItem.current_bid){
        // console.log("Bid Too Low")
      }else{
        // console.log("Submit to Express")
        this.props.submitBidToExpress(bidAmount, auctionItem.id, this.props.userToken)
        // console.log("B-Amount: " + bidAmount)
        // console.log("auctionItem.id: "  + auctionItem.id)
        // console.log("B-Amount" + this.props.userToken)
      }
    }
  }
  makePayment(){
    console.log("Test")
    var handler = window.StripeCheckout.configure({
      key: 'pk_test_M15Qplc1eweA2bEYWObtN0LT',
      locale: 'auto'
    })
    handler.open({
      name: "Buy stuff from my auction site",
      description: "Pay for your auction",
      amount: 10 * 100
      // image: 'http://www.url'
    })
  }
    render() {
      var item = {name: '', description: '', image_url: '', buy_now_price: ''}
      if(this.props.item !== null){
        item = this.props.item.results[0]
      }

        return (
        <div className='body-content-wrapper'>
          <div className="col-xs-12">
            <h2 className="text-center">{item.name}</h2>
          </div>
          <div className="col-xs-12">
            <div className="row">
              <div className="col-md-4">
                <img className="img-responsive" alt='a' src={'http://localhost:3000/images/' + item.image_url}/>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-xs-12">
                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    {item.description}
                  </div>
                  <div className="col-xs-12 bid-description">
                    <p>Starting Bid: {item.starting_bid}</p>
                    <p>Current Bid: {item.current_bid}</p>
                    <p>Current Highest Bidder: {item.high_bidder_id}</p>
                    <p>Buy Now Price: {item.buy_now_price}</p>
                    <form onSubmit={this.submitBid}>
                      <input type="number" placeholder="Enter your bid"/>
                      <button>Bid</button>
                    </form>
                    <button className='btn btn-primary' onClick={this.makePayment}> Pay my auction </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }
}

// go to all. like the array map function
function mapStateToProps(state){
  return{
    item: state.getItem,
      userToken: state.login.token
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    FetchItemDetails : FetchItemDetails,
      submitBidToExpress: SubmitBidAction
    // FetchItems: FetchItems
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
