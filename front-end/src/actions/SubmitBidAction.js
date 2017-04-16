import $ from 'jquery';

export default function (bidAmount, auctionItemId, userToken){
	// Make sure Express knows who we are... from our token
	var bidInfo = {
		bidAmount: bidAmount,
		auctionItemId: auctionItemId,
		userToken: userToken
	}
	// console.log(userToken)
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/submitBid",
		data: bidInfo
	});
	return{
		type: "SUBMIT_BID",
		payload: thePromise
	}
}


// import $ from 'jquery';

// export default function (bidAmount, auctionItemId, userToken){
// 	// Make sure Express knows who we are... from our token
// 	var bidInfo = {
// 		bidAmount: bidAmount,
// 		auctionItemId: auctionItemId,
// 		userToken: userToken
// 	}
// 	// console.log(userToken)
// 	var thePromise = $.ajax({
// 		method: "POST",
// 		url: "http://pauldkang.com:3000/submitBid",
// 		data: bidInfo
// 	});
// 	return{
// 		type: "SUBMIT_BID",
// 		payload: thePromise
// 	}
// }
