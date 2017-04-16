import $ from 'jquery'

export default function FetchItemDetails(id){
  // console.log(id);
  const databaseUrl = 'http://localhost:3000/products/'
	const thePromise = $.getJSON(`${databaseUrl}${id}/`)
	// console.log(thePromise)
	return{
		type: "GET_ITEM_DETAILS",
		payload: thePromise
	}
}


// import $ from 'jquery'

// export default function FetchItemDetails(id){
//   // console.log(id);
//   const databaseUrl = 'http://pauldkang.com:3000/products/'
// 	const thePromise = $.getJSON(`${databaseUrl}${id}/`)
// 	// console.log(thePromise)
// 	return{
// 		type: "GET_ITEM_DETAILS",
// 		payload: thePromise
// 	}
// }
