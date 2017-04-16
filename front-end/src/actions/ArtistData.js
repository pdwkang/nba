import $ from 'jquery'
const databaseUrl = 'http://localhost:3000'
export default function grabbingItems(artistID){
	const thePromise = $.getJSON(`${databaseUrl}/artistData/` + artistID)
	return{
		type: "ARTIST_DATA",
		payload: thePromise
	}
}


