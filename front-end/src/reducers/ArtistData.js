export default function (state = null, action){
	switch(action.type){
		case "ARTIST_DATA" :
			return action.payload
		default:
			return state
	}
}
