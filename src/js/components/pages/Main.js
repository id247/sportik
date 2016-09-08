import React from 'react';
import { connect } from 'react-redux';

import Cookie from 'js-cookie';
import { PromoOptions } from 'appSettings';

import { TweenMax, TimelineMax } from 'gsap';


var sportik = {
	position: 'fixed',
	right: '-500px',
	bottom: '50px',
	zIndex: 5000000,
};
var sportik__image = {
	display: 'block',
	width: '250px',
	height: '337px',
	background: 'url(' + PromoOptions.cdn + 'images/pers.png) no-repeat',
};
var sportik__close = {
	position: 'absolute',
	top: '0px',
	right: '0px',
	fontSize: '40px',
	cursor: 'pointer',
};
var sportik__text = {
	position: 'absolute',
	bottom: '100%',
	right: '50%',
	fontSize: '20px',
	background: '#fff',
	padding: '10px',
	borderRadius: '30px',
	textAlign: 'center',
	maxWidth: '200px',
	minWidth: '150px',
	boxShadow: '0 0 15px rgba(0,0,0,.5)',
};

class Main extends React.Component {

	componentDidMount(){
		console.log(localStorage.getItem('hiddenTil'));
		if (!localStorage.getItem('hiddenTil')){
			this._show();
		}
	}

	_show(){
		const { sportik, sportik__text } = this.refs;

		var tl = new TimelineMax();
		
		tl.fromTo( sportik, 1, {
			right: '-500px',
			transform: 'scale(.2)',
		},{
			right: '50px',
			transform: 'scale(1)',
		})
		.fromTo( sportik__text, .5, {
			transform: 'scale(0)',
		},{
			transform: 'scale(1)',
		});
	}

	_hide(){
		const { sportik } = this.refs;
		
		TweenMax.to( sportik, .5, {
			right: '-500px',
		});
	}

	_closeHandler = () => (e) => {
		e.preventDefault();
		localStorage.setItem('hiddenTil', 'yes');

		console.log(localStorage.getItem('hiddenTil'));
		this._hide();
	}

	render(){
		const { props } = this;
		console.log(9);
		return(

			<div ref="sportik" style={sportik}>

				<span style={sportik__image}></span>

				<span ref="sportik__text" style={sportik__text}>Привет! Я тебя достану!</span>

				<span 
					style={sportik__close}
					onClick={this._closeHandler()}
				>
					&times;
				</span>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//logout: () => dispatch(asyncActions.logout()), 
});

Main.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
