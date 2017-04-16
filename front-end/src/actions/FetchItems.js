import $ from 'jquery'

const databaseUrl = 'http://localhost:3000'

export default function grabbingItems(){
	const thePromise = $.getJSON(`${databaseUrl}/`)
	// console.log(thePromise)
	return{
		type: "GET_ITEM",
		payload: thePromise
	}
}



// import $ from 'jquery'

// const databaseUrl = 'http://pauldkang.com:3000'

// export default function grabbingItems(){
// 	const thePromise = $.getJSON(`${databaseUrl}/`)
// 	// console.log(thePromise)
// 	return{
// 		type: "GET_ITEM",
// 		payload: thePromise
// 	}
// }

