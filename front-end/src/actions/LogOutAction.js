import $ from 'jquery';

export default function(token){
    console.log('action token: ' + token);
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/logout",
		data: {token: token}
	});
	return{
		type: "LOGOUT",
		payload: thePromise
	}
}
