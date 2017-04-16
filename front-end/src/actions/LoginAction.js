import $ from 'jquery';

export default function(loginData){
	// console.log(registerData)
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/login",
		data: loginData
	});
	return{
		type: "LOGIN",
		payload: thePromise
	}
}


// import $ from 'jquery';

// export default function(loginData){
// 	// console.log(registerData)
// 	var thePromise = $.ajax({
// 		method: "POST",
// 		url: "http://pauldkang.com:3000/login",
// 		data: loginData
// 	});
// 	return{
// 		type: "LOGIN",
// 		payload: thePromise
// 	}
// }
