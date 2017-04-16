import $ from 'jquery';

export default function(profileData){
    // console.log('action token: ' + token);
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/updateProfile",
		data: profileData
	});
	return{
		type: "LOGIN",
		payload: thePromise
	}
}
