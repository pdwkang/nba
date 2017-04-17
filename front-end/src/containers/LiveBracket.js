import React, {Component} from 'react';
import EachItemInFrontPage from '../containers/EachItemInFrontPage.js'
import JustBracket from '../containers/JustBracket.js'
import FetchItems from '../actions/FetchItems.js'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

var example_bracket2={
      
        teams:['GSW','POR','LAC','UTA','SAS','MEM','HOU','OKC','BOS','CHI','WSH','ATL','CLE','IND','TOR','MIL'],
        // West First Round
        w11:{winner:'GSW',game:0},
        w12:{winner:'',game:0},
        w13:{winner:'',game:0},
        w14:{winner:'',game:0},

        e11:{winner:'',game:0},
        e12:{winner:'',game:0},
        e13:{winner:'',game:0},
        e14:{winner:'',game:0},

        w21:{winner:'',game:0},
        w22:{winner:'',game:0},

        e21:{winner:'',game:0},
        e22:{winner:'',game:0},

        w3:{winner:'',game:0},

        e3:{winner:'',game:0},

        finals:{winner:'',tieBreaker:''}
      
    }


// west8, east8, west4, east4, west2, east2, finals
class LiveBracket extends Component {
	render(){
		return(
			<JustBracket bracket={example_bracket2}/>
		)
	}
}



export default LiveBracket