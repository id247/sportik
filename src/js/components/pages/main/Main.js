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
		opacity: 0,
		transform: 'scale(0)',
	},
	friend: {	
		opacity: 0,
		transform: 'scale(0)',
	},
	bubble: {
		opacity: 0,
	}
}

const initialState = {
	text: false,
	buttons: [],
	boxVisible: true,
	friendVisible: false,
	closeVisible: false,
}

class Main extends React.Component {

	constructor(props){
		super(props);

		this.state = initialState;

		this.activeAnimation = false;
		this.timelines = [];
	}

	componentDidMount(){
		const { props } = this;

		this._setBoxInitialState();
		this._setFriendInitialState();


		this._animationInit();

		this.timeline = new TimelineMax({});

	}

	_setBoxInitialState(){
		const { box } = this.refs;

		TweenMax.set(box, initialPosotions.box);

		this._setBubbleInitialState();
	}

	_setFriendInitialState(){
		const { friend } = this.refs;

		TweenMax.set(friend, initialPosotions.friend);
	}

	_setBubbleInitialState(){
		const { bubble, bubbleText, bubbleButtons } = this.refs;
		return;
		TweenMax.set(bubble, initialPosotions.bubble);
		TweenMax.set(bubbleText, initialPosotions.bubble);
		TweenMax.set(bubbleButtons, initialPosotions.bubble);
	}

	_firstShow(){

		const { props } = this;
	
		if (props.cookies.hiddenUntil < new Date().getTime() ){
			this._show();
		}else{
			this._hide();
		}
		
	}


	_show(){

		const { box, friend } = this.refs;

		this.setState({
			...this.state,
			...initialState
		});

		this._setBoxInitialState();

		const timeline = new TimelineMax({});
		this.timelines.push(timeline);


		timeline.to( friend, .5, {
			...initialPosotions.friend,
			...{
				onStart: () => {
					this._hideCloseButton();
				},
			}
		})
		.to( box, .5, {
			opacity: 1,
			transform: 'scale(1)',
			onComplete: () => {
				this._showCloseButton();
				this._selectAppearance();
			},
		})
		;
	}

	_hide(){

		const { box, friend } = this.refs;

		const timeline = new TimelineMax({});
		this.timelines.push(timeline);
		
		timeline.to( box, .5, {
			marginTop: '-200px',
			transform: 'scale(0)',
			onStart: () => {
				this._hideCloseButton();
			}
		})
		.to( friend, 0, initialPosotions.friend)
		.to( friend, .5, {
			opacity: 1,
			transform: 'scale(1)',
			onComplete: () => {
				this._showCloseButton();
				this._selectAppearance();
			},
		})
		;

	}

	_animationInit(){
		const { props } = this;
		const { canvas } = this.refs;

		const that = this;

		console.log(props);

		const persScript = document.createElement('script');
		let filename = '';

		switch(parseInt(props.cookies.chosenPers)){
			case 1: 
				filename = 'boy1_anim';
				break;
			case 2:
				filename = 'boy2_anim';
				break;
			case 3: 
				filename = 'girl2_anim';
				break;
			case 4:
				filename = 'girl1_anim';
				break;
			default: 
				return;
		}

		persScript.src = PromoOptions.cdn + 'js/' + filename + '/' + filename + '.js';

		document.body.appendChild(persScript);

		function init(){

			if (typeof lib !== 'object'){
				setTimeout( () => {
					init();
				}, 100);

				return;
			}

			animation.init({
				canvas: canvas, 
				pers: filename
			})
			.then( pers => {
				that.pers = pers;

				that._firstShow();
			})
			.catch( err => {
				console.error(err);
			});			
		}

		persScript.addEventListener('load', function(){

			console.log('loaded');

			init();


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

		//this.props.appearanceCountUpdate();
	}

	_showText(){

		const { bubble, bubbleText, bubbleButtons } = this.refs;

		const timeline = new TimelineMax({
		});

		this.timelines.push(timeline);

		timeline.fromTo( bubble, .3, {
			opacity: '0',
		},{			
			opacity: '1',
		})
		.fromTo( bubbleText, .4, {
			opacity: '0',
		},{			
			opacity: '1',
		})
		.fromTo( bubbleButtons, .7, {
			opacity: '0',
		},{			
			opacity: '1',			
		})
		;

	}

	_clearBubble(){
		this.setState({
			...this.state,
			...{
				text: false,
				buttons: [],
			}
		});
	}


	_showCloseButton(){
		this.setState({
			...this.state,
			...{
				closeVisible: true,
			}
		});		
	} 

	_hideCloseButton(){
		this.setState({
			...this.state,
			...{
				closeVisible: false,
			}
		});		
	} 


	//gentrate uniq timestamp id rof animateion
	_createAnimationId(){
		const animationId = new Date().getTime();
		this.activeAnimation = animationId;
		return animationId;
	}

	_animationExists(animationId){
		return this.activeAnimation === animationId;
	}

	//uniq id from _createAnimationId(), frame label, pauseAfter in ms
	_animationPlay(animationId, label, pauseAfter = 0){
		if (this._animationExists(animationId)){
			return animation.gotoAndPlay(this.pers, label, pauseAfter);
		}

		throw new Error('stopped');
	}

	_animationCatch(err){
		if (err.message === 'stopped'){
			return;
		}
		console.error(err);
	}

	_sayHi(){

		const animationId = this._createAnimationId();

		this._animationPlay(animationId, 'say_hello')
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
							handler: this._okClickHandler,
						}
					],
				}
			});

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'hand_up') )
		.then( () => this._animationPlay(animationId, 'normal') )
		.catch( this._animationCatch )
		;

	}

	_homework(){

		const animationId = this._createAnimationId();

		this._animationPlay(animationId, 'say_hello')
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
							handler: this._okClickHandler,
						}
					],
				}
			});

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'mouth_close') )
		.catch( this._animationCatch )
		;

	}

	_fact(){

		const animationId = this._createAnimationId();
		
		this._animationPlay(animationId, 'say_hello')
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
							handler: this._okClickHandler,
							href: 'https://ad.dnevnik.ru/promo/sportik-quiz',
						}
					],
				}
			});

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'mouth_close') )
		.catch( this._animationCatch )
		;

	}

	_goodBuy(){

		const animationId = this._createAnimationId();
		
		this._animationPlay(animationId, 'say_hello')
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
							handler: this._okClickHandler,
						}
					],
				}
			});

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'mouth_close') )
		.catch( this._animationCatch )
		;

	}

	_okClick(){

		this._clearBubble();
		this.props.appearanceCountUpdate();

		let animationVariant = 0;

		const animationId = this._createAnimationId();

		const animationVariants = [
			() => {
				this._animationPlay(animationId, 'hand_down')
				.then( () => this._animationPlay(animationId, 'drink') )
				.then( () => this._animationPlay(animationId, 'show_bottle', 1000) )
				.then( () => this._animationPlay(animationId, 'hide_bottle') )
				.then( () => this._animationPlay(animationId, 'hand_up') )
				.then( () => this._animationPlay(animationId, 'normal') )
				.catch( this._animationCatch )
				;
			},
			() => {
				this._animationPlay(animationId, 'hand_down')
				.then( () => this._animationPlay(animationId, 'drink') )
				.then( () => this._animationPlay(animationId, 'hand_up') )
				.then( () => this._animationPlay(animationId, 'normal') )
				.catch( this._animationCatch )
				;
			},
			() => {
				this._animationPlay(animationId, 'show_bottle', 1000)
				.then( () => this._animationPlay(animationId, 'hide_bottle') )
				.then( () => this._animationPlay(animationId, 'normal') )
				.catch( this._animationCatch )
				;
			},
		];

		if (this.props.cookies.appearanceCount > 0){
			animationVariant = 1;
		}

		animationVariants[animationVariant]();
	}

	_canvasClickHandler = () => (e) => {
		e.preventDefault();
	}


	_showHandler = () => (e) => {
		e.preventDefault();
		this.props.cookiesShowPers();
		this._show();
	}

	_closeHandler = () => (e) => {
		e.preventDefault();
		this.props.cookiesHidePers();
		this._hide();
	}

	_okClickHandler = () => (e) => {
		this._okClick();
	}

	render(){
		const { props, state } = this;

		return(
			<div styleName="sportik">

				<div ref="box" styleName="sportik__box"
					//style={{display: state.boxVisible ? 'block' : 'none' }}
				>

					<div styleName="sportik__text">

						<div styleName={ !state.text ? 'bubble' : 'bubble--visible' }
							ref="bubble"
							//style={{display: state.text ? 'block' : 'none'}}
						>

							<div styleName="bubble__inner">
								
								<div styleName="bubble__text" ref="bubbleText">	
								
									{state.text}		
								
								</div>

								<div styleName="bubble__buttons" 
									ref="bubbleButtons"				
									//style={{display:  ? 'block' : 'none'}}
								>

									{ state.buttons.map( (button, i) => (
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
							height="175" 
							styleName="sportik__canvas"
							//onClick={this._canvasClickHandler()}
						>
						</canvas>

						<div styleName={!state.closeVisible ? 'sportik__close-placeholder' : 'sportik__close-placeholder--visible' }
						>

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
	cookiesShowPers: () => dispatch(cookiesActions.cookiesShowPers()), 
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
