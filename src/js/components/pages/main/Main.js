import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { PromoOptions } from 'appSettings';

import * as animation from '../../../animation';

import * as cookiesActions from '../../../actions/cookies'

import styles from './main.scss';

import { TweenMax, TimelineMax } from 'gsap';



class Main extends React.Component {

	componentDidMount(){

		this._canvas = this.refs.canvas;
		this._box = this.refs.box;


		this._animation();
	}

	_show(){

		var tl = new TimelineMax();
		
		tl.fromTo( this._box, 1, {
			right: '-500px',
			transform: 'scale(.2)',
		},{
			right: '50px',
			transform: 'scale(1)',
		});
	}

	_hide(){
		
		TweenMax.to( this._box, .5, {
			right: '-500px',
		});


		this.props.cookiesHidePers();

	}

	_animation(){
		const that = this;

		animation.init({canvas: this._canvas})
		.then( boy => {
			this.boy = boy;
		})
		.catch( err => {
			console.error(err);
		});

		this._show();
	}

	_canvasClickHandler = () => (e) => {
		e.preventDefault();

		console.log(this.boy);

		animation.gotoAndPlay(this.boy, 'say_words2')
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'normal');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'drink');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'normal');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'show_bottle');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'hide_bottle');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'normal');
		});

	}


	_closeHandler = () => (e) => {
		e.preventDefault();
		this._hide();
	}

	render(){
		const { props } = this;

		return(

			<div ref="box" styleName="box">

				<canvas 
					ref="canvas" 
					width="200" 
					height="165" 
					className="box__canvas"
					onClick={this._canvasClickHandler()}
				>
				</canvas>

				<span 
					styleName="close"
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
	cookiesHidePers: () => dispatch(cookiesActions.cookiesHidePers()), 
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Main, styles));
