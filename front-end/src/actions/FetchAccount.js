import $ from 'jquery'

export default function FetchAccount(username){
  	const databaseUrl = 'http://localhost:3000/account/' + username
	const thePromise = $.getJSON(databaseUrl)
	return{
		type: "GET_ACCOUNT",
		payload: thePromise
	}
}


// import $ from 'jquery'

// export default function FetchAccount(username){
//   	const databaseUrl = 'http://pauldkang.com:3000/account/' + username
// 	const thePromise = $.getJSON(databaseUrl)
// 	return{
// 		type: "GET_ACCOUNT",
// 		payload: thePromise
// 	}
// }
