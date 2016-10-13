import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { PromoOptions } from 'appSettings';

import * as animation from '../../../animation';

import * as cookiesActions from '../../../actions/cookies'

import styles from './main.scss';

import { TweenMax, TimelineMax } from 'gsap';

const initialPosotions = {
	box: {			
		marginTop: '0px',
		marginLeft: '1000px',
		transform: 'scale(0)',
	},
	friend: {	
		opacity: 0,
		transform: 'scale(0)',
	}
}

class Main extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			text: false,
			buttons: [],
			boxVisible: true,
			friendVisible: false,
		}
	}

	componentDidMount(){

		this._canvas = this.refs.canvas;
		this._box = this.refs.box;
		this._friend = this.refs.friend;
		this._animationInit();

		TweenMax.to(this._box, 0, initialPosotions.box);

		TweenMax.to(this._friend, 0, initialPosotions.friend);

	}

	_show(){
		// TweenMax.to( this._box, 1, {
		// 	marginLeft: '470px',
		// 	transform: 'scale(1)',
		// 	onComplete: this._selectAppearance.bind(this),
		// });


		const tl = new TimelineMax({
			//onComplete: first.bind(this)
		});

		tl.to( this._friend, 0, initialPosotions.friend)
		.to( this._box, 0, initialPosotions.box)
		.to( this._box, .5, {
			marginLeft: '470px',
			transform: 'scale(1)',
			onComplete: this._selectAppearance.bind(this),
		})
		;
	}

	_hide(){

		const tl = new TimelineMax({
			//onComplete: first.bind(this)
		});

		tl.to( this._box, .5, {
			marginTop: '-200px',
			transform: 'scale(0)',
		})
		.to( this._friend, 0, initialPosotions.friend)
		.to( this._friend, .5, {
			opacity: 1,
			transform: 'scale(1)',
		})
		;

		this.props.cookiesHidePers();

	}

	_animationInit(){

		animation.init({canvas: this._canvas})
		.then( boy => {
			this.boy = boy;

			this._show();
		})
		.catch( err => {
			console.error(err);
		});
		
	}

	_selectAppearance(){

		const { props } = this;

		console.log(props.cookies.appearanceCount);

		switch(props.cookies.appearanceCount){
			case 0: 
					this._sayHi();
					break;
			case 1: 
					this._homework();
					break;
			case 2: 
					this._fact();
					break;
			case 3: 
					this._goodBuy();
					break;
			default: 
					console.log('enought for today');
		}

		this.props.appearanceCountUpdate();
	}

	_sayHi(){
		console.log('hi');

		//console.log(this.refs);

		//return;

		const { bubble, bubbleInner, bubbleText, bubbleButtons } = this.refs;


			animation.gotoAndPlay(this.boy, 'say_hello')
			.then( () => {

			this.setState({
				...this.state,
				...{
					text: (
						<div>
							<h3>
							Привет!
							</h3>
							<p>
								Я твой новый друг — Спортик!
							</p>
							<p>
								С сегодняшнего дня я буду помогать тебе поддерживать водный баланс.
							</p>
							<p>
								Начнём?
							</p>
						</div>
					),
					buttons: [
						{
							text: 'Я готов!',
							handler: this._goNormalDrinkHandler,
						}
					],
				}
			});

			const tl = new TimelineMax({
				//onComplete: first.bind(this)
			})

			tl.fromTo( bubble, .3, {
				opacity: '0',
			},{			
				opacity: '1',
				//onComplete: this._selectAppearance.bind(this),
			})
			.fromTo( bubbleText, .4, {
				opacity: '0',
			},{			
				opacity: '1',
				//onComplete: this._selectAppearance.bind(this),
			})
			.fromTo( bubbleButtons, .7, {
				opacity: '0',
			},{			
				opacity: '1',			
			})
			;

			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		;
	}

	_homework(){

		animation.gotoAndPlay(this.boy, 'say_hello')
		.then( () => {

			this.setState({
				...this.state,
				...{
					text: (
						<div>
							<p>
								Привет! На завтра у тебя есть домашнее задание.
							</p> 
							<p>
								Делай небольшие перерывы между заданиями и не забывай пить воду!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._goNormalShowHandler,
						}
					],
				}
			});

			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'mouth_close');
		})
		;

	}

	_fact(){


		
		animation.gotoAndPlay(this.boy, 'say_hello')
		.then( () => {


			this.setState({
				...this.state,
				...{
					text: (
						<div>
							<p>
								Ты знаешь, что за день мы выдыхаем около 0,5 литра жидкости? 
							</p> 
							<p>
								Сколько же тогда воды должно поступать в организм?
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хочу узнать!',
							handler: this._goLinkHandler,
							href: 'http://sportik.svyatoyistochnik.com/',
						}
					],
				}
			});

			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'mouth_close');
		})
		;

	}

	_goodBuy(){

		animation.gotoAndPlay(this.boy, 'say_hello')
		.then( () => {

			this.setState({
				...this.state,
				...{
					text: (
						<div>
							<p>
								Надеюсь, тебе было интересно! 
							</p> 
							<p>
								До встречи завтра! Старайся хорошо учиться и не забывай пить воду!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Пока!',
							handler: this._goNormalDrinkHandler,
						}
					],
				}
			});

			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'say_words2');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'mouth_close');
		})
		;

	}

	_goNormalDrink(){

		this.setState({
			...this.state,
			...{
				text: false,
				buttons: [],
			}
		});

		animation.gotoAndPlay(this.boy, 'drink')
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'show_bottle');
		})
		.then( () => {
			return animation.wait(1000);
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'hide_bottle');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'normal');
		})
		;

	}

	_goLink(){

		this.setState({
			...this.state,
			...{
				text: false,
				buttons: [],
			}
		});

		animation.gotoAndPlay(this.boy, 'normal');
		;

	}

	_goNormalShow(){

		this.setState({
			...this.state,
			...{
				text: false,
				buttons: [],
			}
		});

		animation.gotoAndPlay(this.boy, 'show_bottle')
		.then( () => {
			return animation.wait(1000);
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'hide_bottle');
		})
		.then( () => {
			return animation.gotoAndPlay(this.boy, 'normal');
		})
		;

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


	_showHandler = () => (e) => {
		e.preventDefault();
		this._show();
	}

	_closeHandler = () => (e) => {
		e.preventDefault();
		this._hide();
	}

	_allGoodHandler = () => (e) => {
		e.preventDefault();
		this._allGood();
	}


	_goNormalDrinkHandler = () => (e) => {
		e.preventDefault();
		this._goNormalDrink();
	}
	_goNormalShowHandler = () => (e) => {
		e.preventDefault();
		this._goNormalShow();
	}
	_goLinkHandler = () => (e) => {
		//e.preventDefault();
		this._goLink();
	}

	render(){
		const { props, state } = this;

		return(
			<div styleName="sportik">

				<div ref="box" styleName="sportik__box"
					//style={{display: state.boxVisible ? 'block' : 'none' }}
				>

					<div styleName="sportik__text">

						<div styleName="bubble"
							ref="bubble"
							style={{display: state.text ? 'block' : 'none'}}
						>

							<div styleName="bubble__inner" ref="bubbleInner">
								
								<div styleName="bubble__text" ref="bubbleText">	
								
									{state.text}		
								
								</div>

								<div styleName="bubble__buttons" 
									ref="bubbleButtons"				
									style={{display: state.buttons.length > 0 ? 'block' : 'none'}}
								>

									{state.buttons.map( (button, i) => (
										!button.href
										?										
										(
										<button
											key={'bubble-button' + i}
											styleName="button-blue"
											onClick={button.handler()}
										>
											{button.text}
										</button>
										)
										:								
										(
										<a 
											href={button.href}
											target="_blank"
											key={'bubble-button' + i}
											styleName="button-blue"
											onClick={button.handler()}
										>
											{button.text}
										</a>
										)
									))}

								</div>

							</div>
						
						</div>	

					</div>

					<div styleName="sportik__canvas-placeholder">

						<canvas 
							ref="canvas" 
							width="200" 
							height="165" 
							styleName="sportik__canvas"
							//onClick={this._canvasClickHandler()}
						>
						</canvas>

						<div styleName="sportik__close-placeholder">

							<button 
								styleName="button-close"
								onClick={this._closeHandler()}
							>
								&times;
							</button>

						</div>

					</div>

				</div>

				<div ref="friend" styleName="sportik__friend"
					//style={{display: state.friendVisible ? 'block' : 'none' }}
				>

					<div styleName="friend"
						onClick={this._showHandler()}
					>

						<div styleName="friend__title">
							Твой друг
						</div>

						<div styleName="friend__text">
							Показать
						</div>

					</div>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	cookies: state.cookies,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//logout: () => dispatch(asyncActions.logout()), 
	cookiesHidePers: () => dispatch(cookiesActions.cookiesHidePers()), 
	appearanceCountUpdate: () => dispatch(cookiesActions.appearanceCountUpdate()), 
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
