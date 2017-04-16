import $ from 'jquery';

export default function(profilePic){
	var formData = new FormData();
	console.log(profilePic.profileImg)
	formData.append('profileImg', profilePic.profileImg);
	formData.append('token', profilePic.token)
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/profilePic",
		processData: false,
        dataType: 'json',
        cache: false,
        data: formData,
        contentType: false
	});
	return{
		type: "LOGIN",
		payload: thePromise
	}
}
