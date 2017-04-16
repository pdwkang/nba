import $ from 'jquery'


export default function getArtists(){
	const thePromise = $.getJSON('http://localhost:3000/artists')
	// console.log(thePromise)
	return{
		type: "GET_ARTISTS",
		payload: thePromise
	}
}
