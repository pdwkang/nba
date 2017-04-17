import React, {Component} from 'react';

export default class JustBracket extends Component {
	render(){
		var example_bracket = this.props.bracket
		return(
			<div style={{backgroundColor:'blue', width:1200, height:800, margin:'auto', position:'relative'}}>

		        <div className='each-team-box' style={{top:0,left:0}}>{example_bracket.teams[0]}</div>
		        <div className='each-team-box' style={{top:80,left:0}}>{example_bracket.teams[1]}</div>
		        <div className='each-team-box' style={{top:160,left:0}}>{example_bracket.teams[2]}</div>
		        <div className='each-team-box' style={{top:240,left:0}}>{example_bracket.teams[3]}</div>
		        <div className='each-team-box' style={{top:320,left:0}}>{example_bracket.teams[4]}</div>
		        <div className='each-team-box' style={{top:400,left:0}}>{example_bracket.teams[5]}</div>
		        <div className='each-team-box' style={{top:480,left:0}}>{example_bracket.teams[6]}</div>
		        <div className='each-team-box' style={{top:560,left:0}}>{example_bracket.teams[7]}</div>

		        <div className='each-team-box' style={{top:0,right:0}}>{example_bracket.teams[8]}</div>
		        <div className='each-team-box' style={{top:80,right:0}}>{example_bracket.teams[9]}</div>
		        <div className='each-team-box' style={{top:160,right:0}}>{example_bracket.teams[10]}</div>
		        <div className='each-team-box' style={{top:240,right:0}}>{example_bracket.teams[11]}</div>
		        <div className='each-team-box' style={{top:320,right:0}}>{example_bracket.teams[12]}</div>
		        <div className='each-team-box' style={{top:400,right:0}}>{example_bracket.teams[13]}</div>
		        <div className='each-team-box' style={{top:480,right:0}}>{example_bracket.teams[14]}</div>
		        <div className='each-team-box' style={{top:560,right:0}}>{example_bracket.teams[15]}</div>

		        <div className='each-team-box' style={{top:40,left:150}}>{example_bracket.w11.winner}</div>
		        <div className='each-team-box' style={{top:200,left:150}}>{example_bracket.w12.winner}</div>
		        <div className='each-team-box' style={{top:360,left:150}}>{example_bracket.w13.winner}</div>
		        <div className='each-team-box' style={{top:520,left:150}}>{example_bracket.w14.winner}</div>

		        <div className='each-team-box' style={{top:40,right:150}}>{example_bracket.e11.winner}</div>
		        <div className='each-team-box' style={{top:200,right:150}}>{example_bracket.e12.winner}</div>
		        <div className='each-team-box' style={{top:360,right:150}}>{example_bracket.e13.winner}</div>
		        <div className='each-team-box' style={{top:520,right:150}}>{example_bracket.e14.winner}</div>

		        <div className='each-team-box' style={{top:120,left:300}}>{example_bracket.w21.winner}</div>
		        <div className='each-team-box' style={{top:440,left:300}}>{example_bracket.w22.winner}</div>
		        <div className='each-team-box' style={{top:120,right:300}}>{example_bracket.e21.winner}</div>
		        <div className='each-team-box' style={{top:440,right:300}}>{example_bracket.e22.winner}</div>

		        <div className='each-team-box' style={{top:280,left:450}}>{example_bracket.w3.winner}</div>
		        <div className='each-team-box' style={{top:280,right:450}}>{example_bracket.e3.winner}</div>

		        <div className='each-team-box' style={{top:480,left:0,right:0,margin:'auto'}}>{example_bracket.finals.winner}</div>
		      </div>
		)

	}
}