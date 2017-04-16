export default function (state = null, action){
	switch(action.type){
		case "GET_ITEM" :
			return action.payload
		case 'GET_ITEM_DETAILS':
			return action.payload
		default:
		return state			
	}

}
