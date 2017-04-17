import React, {Component} from 'react';

export default class JustBracketForm extends Component {
	render(){
		var example_bracket = this.props.bracket
		return(
			<div style={{backgroundColor:'blue', width:1200, height:800, margin:'auto', position:'relative'}}>

				<div className='each-team-box' style={{top:0,left:0}}>{example_bracket[0][0]}</div>
				<div className='each-team-box' style={{top:80,left:0}}>{example_bracket[0][1]}</div>
				<div className='each-team-box' style={{top:160,left:0}}>{example_bracket[0][2]}</div>
				<div className='each-team-box' style={{top:240,left:0}}>{example_bracket[0][3]}</div>
				<div className='each-team-box' style={{top:320,left:0}}>{example_bracket[0][4]}</div>
				<div className='each-team-box' style={{top:400,left:0}}>{example_bracket[0][5]}</div>
				<div className='each-team-box' style={{top:480,left:0}}>{example_bracket[0][6]}</div>
				<div className='each-team-box' style={{top:560,left:0}}>{example_bracket[0][7]}</div>

				<div className='each-team-box' style={{top:0,right:0}}>{example_bracket[0][8]}</div>
				<div className='each-team-box' style={{top:80,right:0}}>{example_bracket[0][9]}</div>
				<div className='each-team-box' style={{top:160,right:0}}>{example_bracket[0][10]}</div>
				<div className='each-team-box' style={{top:240,right:0}}>{example_bracket[0][11]}</div>
				<div className='each-team-box' style={{top:320,right:0}}>{example_bracket[0][12]}</div>
				<div className='each-team-box' style={{top:400,right:0}}>{example_bracket[0][13]}</div>
				<div className='each-team-box' style={{top:480,right:0}}>{example_bracket[0][14]}</div>
				<div className='each-team-box' style={{top:560,right:0}}>{example_bracket[0][15]}</div>

				<div className='each-team-box' style={{top:40,left:150}}>{example_bracket[1].winner}</div>
				<div className='each-team-box' style={{top:200,left:150}}>{example_bracket[4].winner}</div>
				<div className='each-team-box' style={{top:360,left:150}}>{example_bracket[2].winner}</div>
				<div className='each-team-box' style={{top:520,left:150}}>{example_bracket[3].winner}</div>

				<div className='each-team-box' style={{top:40,right:150}}>{example_bracket[5].winner}</div>
				<div className='each-team-box' style={{top:200,right:150}}>{example_bracket[8].winner}</div>
				<div className='each-team-box' style={{top:360,right:150}}>{example_bracket[6].winner}</div>
				<div className='each-team-box' style={{top:520,right:150}}>{example_bracket[7].winner}</div>

				<div className='each-team-box' style={{top:120,left:300}}>{example_bracket[9].winner}</div>
				<div className='each-team-box' style={{top:440,left:300}}>{example_bracket[10].winner}</div>
				
				<div className='each-team-box' style={{top:120,right:300}}>{example_bracket[11].winner}</div>
				<div className='each-team-box' style={{top:440,right:300}}>{example_bracket[12].winner}</div>
				<div className='each-team-box' style={{top:280,left:450}}>{example_bracket[13].winner}</div>
				<div className='each-team-box' style={{top:280,right:450}}>{example_bracket[14].winner}</div>
			</div>
		)

	}
}