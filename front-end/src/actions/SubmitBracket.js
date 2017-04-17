import $ from 'jquery';

export default function(data){
	console.log(data)
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/submitBracket",
		data:data
	});
	return{
		type: "LOGIN",
		payload: thePromise
	}
}