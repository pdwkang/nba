import { combineReducers} from 'redux';
import GetItemReducer from './GetItemReducer.js';
import RegisterReducer from './RegisterReducer.js';
import LoginReducer from './LoginReducer.js';
import GetAccountReducer from './GetAccountReducer.js';
import BidReducer from './BidReducer.js';
import Artists from './Artists.js';
import ArtistData from './ArtistData.js';
import Bracket from './Bracket.js';


const rootReducer = combineReducers({
	getItem: GetItemReducer,
	register: RegisterReducer,
	login: LoginReducer,
	account: GetAccountReducer,
	bid: BidReducer,
	artists: Artists,
	artistData: ArtistData,
	bracket:Bracket
})

export default rootReducer;
