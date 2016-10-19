import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import * as animation from '../../../animation';

import * as cookiesActions from '../../../actions/cookies'

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


	_newTimeline(){
		console.log('new timeline');
		const timeline = new TimelineMax({
		});

		this.timelines.push(timeline);	

		return timeline;
	}

	_stopTimelines(){
		this.timelines = this.timelines.filter( timeline => {
			console.log('timeline paused');
			////console.log( timeline && timeline.progress(1, false) );
			//console.log( timeline && timeline.pause() );
			return false;
		});
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

		this._stopTimelines();
		const timeline = this._newTimeline();

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

		this._stopTimelines();
		const timeline = this._newTimeline();
		
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
			},
		})
		;

	}

	_animationInit(){
		const { props } = this;
		const { canvas } = this.refs;

		const that = this;

		//console.log(props);

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
				//console.error(err);
			});			
		}

		persScript.addEventListener('load', function(){

			//console.log('loaded');

			init();


		});
		
	}

	_selectAppearance(){

		const { props } = this;

		//console.log(props.cookies.appearanceCount);

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
					//console.log('enought for today');
		}

		//this.props.appearanceCountUpdate();
	}

	_showText(){

		const { bubble, bubbleText, bubbleButtons } = this.refs;

		const timeline = this._newTimeline();

		timeline.fromTo( bubble, .4, {
			opacity: '0',
		},{			
			opacity: '1',
		})
		.fromTo( bubbleText, .4, {
			opacity: '0',
		},{			
			opacity: '1',
		})
		.fromTo( bubbleButtons, .4, {
			opacity: '0',
		},{			
			opacity: '1',			
		})
		;

	}

	_clearBubble(){

		const { bubble, bubbleText, bubbleButtons } = this.refs;

		this._stopTimelines();
		const timeline = this._newTimeline();

		timeline.fromTo( bubbleButtons, .3, {
			opacity: '1',
		},{			
			opacity: '0',
		})
		.fromTo( bubbleText, .3, {
			opacity: '1',
		},{			
			opacity: '0',
		})
		.fromTo( bubble, .3, {
			opacity: '1',
		},{			
			opacity: '0',			
			onComplete: () => {

			this.setState({
				...this.state,
				...{
					text: false,
					buttons: [],
				}
			});

			}
		})
		;
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
		//console.error(err);
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

			this._showText();
			
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

			this._showText();

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'winked') )
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

			this._showText();

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'winked') )
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

			this._showText();

			return this._animationPlay(animationId, 'say_words2');
		})
		.then( () => this._animationPlay(animationId, 'say_words2') )
		.then( () => this._animationPlay(animationId, 'winked') )
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
			<div className="sportik">

				<div ref="box" className="sportik__box"
				>

					<div className="sportik__text">

						<div className={ 'bubble ' +  ( state.text ? 'bubble--visible' : '' ) }
							ref="bubble"
						>

							<div className="bubble__inner">
								
								<div className="bubble__text" ref="bubbleText">	
								
									{state.text}		
								
								</div>

								<div className="bubble__buttons" 
									ref="bubbleButtons"				
								>

									{ state.buttons.map( (button, i) => (
										!button.href
										?										
										(
										<button
											key={'bubble-button' + i}
											className="button-blue"
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
											className="button-blue"
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

					<div className="sportik__canvas-placeholder">

						<canvas 
							ref="canvas" 
							width="200" 
							height="175" 
							className="sportik__canvas"
							//onClick={this._canvasClickHandler()}
						>
						</canvas>

						<div className={ 'sportik__close-placeholder ' + (state.closeVisible ? 'sportik__close-placeholder--visible' : '') }
						>

							<button 
								className="button-close"
								onClick={this._closeHandler()}
							>
								&times;
							</button>

						</div>

					</div>

				</div>

				<div ref="friend" className="sportik__friend"
					//style={{display: state.friendVisible ? 'block' : 'none' }}
				>

					<div className="friend"
						onClick={this._showHandler()}
					>

						<div className="friend__title">
							Твой друг
						</div>

						<div className="friend__text">
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
