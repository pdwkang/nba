export default function (state = [], action){
	switch(action.type){
		case "SUBMIT_BRACKET" :
			console.log(action.payload)
			return action.payload
		default:
			return state
	}
}
