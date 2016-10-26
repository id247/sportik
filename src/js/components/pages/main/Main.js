import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import * as animation from '../../../animation';

import * as cookiesActions from '../../../actions/cookies'

//import { TweenMax, TimelineMax } from 'gsap';

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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Main extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			text: false,
			buttons: [],
			boxVisible: true,
			friendVisible: false,
			closeVisible: false,
		};

		this.activeAnimation = false;
		this.timelines = [];
	}

	componentWillMount(){

		const { props } = this;

		const parentWin = window.parent ? window.parent : window;

		function setPadding(){
			console.log(parentWin.document.body.clientWidth);
			if (parentWin.innerWidth < 1465){
			//if (viewport().width < 1450){
				props.paddingTop.style.height = '180px';
			}else{
				props.paddingTop.style.height = '';
			}
		}
		setPadding();

		parentWin && parentWin.addEventListener('resize', () => {
			setPadding();
		});


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
			...{
				text: false,
				buttons: [],
				boxVisible: true,
				friendVisible: false,
				closeVisible: false,
			}
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
		let filename = 'boy2_anim';

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
				//return;
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
					this._fact();
					break;
			case 2: 
					this._homework();
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

		const { props } = this;

		const animationId = this._createAnimationId();

		console.log(props.cookies);

		this._animationPlay(animationId, 'say_hello')
		.then( () => {

			let text = null;

			if (props.cookies.isfirst){

				text = (
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
				);

			}else{

				text = (
					<div>
						<h3>
						Привет!
						</h3>
						<p>
							Это Спортик. Сегодня нас с тобой ждёт много интересного!
						</p>
					</div>
				);

			}

			this.setState({
				...this.state,
				...{
					text: text,
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

		let texts = [];

		const parentWin = window.parent ? window.parent : window;

		if (parentWin.location.href.indexOf('schedules') > -1){

			texts = [
				{
					text: (
						<div>
							<p>
								Привет! Завтра у тебя физкультура?
							</p> 
							<p>
								Не забудь форму и обязательно захвати в школу бутылочку воды «Спортик»!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Завтра у тебя физкультура. Когда ты активно двигаешься, то теряешь много жидкости и хуже себя чувствуешь. 
							</p> 
							<p>
								Поэтому не забудь попить перед уроком и после него.
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! У тебя завтра много уроков. 
							</p> 
							<p>
								Чтобы быть бодрым весь день, обязательно захвати в школу бутылочку воды!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! У тебя завтра много уроков. 
							</p> 
							<p>
								Чтобы быть бодрым весь день, обязательно захвати в школу бутылочку воды!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Сегодня у тебя был насыщенный день. 
							</p> 
							<p>
								Чтобы взбодриться перед домашней работой, не забудь попить воды!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Если у тебя иногда бывают не очень хорошие оценки, не расстраивайся! 
							</p> 
							<p>
								Ты их обязательно исправишь!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Спасибо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Завтра у тебя важные уроки. 
							</p> 
							<p>
								Не забудь заранее собрать в рюкзак все учебники и тетради! 
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
			];

		}else{

			texts = [
				{
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
				},
				{
					text: (
						<div>
							<p>
								Человек на 70% состоит из воды, а огурец — на 90%. 
							</p> 
							<p>
								Получается, человек — на 50% огурец?
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Забавно!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Ложась спать, мальчик поставил на стол два стакана воды: целый — если захочет пить, и пустой — если не захочет.
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Забавно!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Делаешь домашнюю работу?
							</p> 
							<p>
								Не забудь выпить стакан воды! Это взбодрит тебя и придаст энергии.
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Спасибо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! На завтра у тебя есть домашнее задание?
							</p> 
							<p>
								Делай небольшие перерывы между заданиями и не забывай пить воду!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Спасибо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Повторенье — мать ученья! 
							</p> 
							<p>
								Не забывай делать домашнюю работу. Это помогает тебе лучше запоминать пройденное.
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! У тебя есть домашнее задание на завтра? 
							</p> 
							<p>
								Выпей немного воды и приступай!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! У тебя есть домашнее задание на завтра? 
							</p> 
							<p>
								Выпей немного воды и приступай!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Хорошо!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Привет! Если тебе трудно вставать в школу, попробуй начинать утро со стакана воды! 
							</p> 
							<p>
								Это поможет взбодриться!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Попробую!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Интересно устроен детский желудок! 
							</p> 
							<p>
								В него не влезают последние ложки супа, но прекрасно помещаются 3 печеньки и 5 конфет!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Точно!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Один приятель спрашивает у другого: 
							</p> 
							<p>
								— Ты поменял рыбкам воду в аквариуме?
							</p> 
							<p>
								— Нет, зачем, они еще эту не выпили!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Забавно!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								— Сколько человек может прожить без воды?
							</p> 
							<p>
								— Ну, я думаю, человек 10—15 максимум!
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Забавно!',
							handler: this._okClickHandler,
						}
					],
				},
				{
					text: (
						<div>
							<p>
								Какой твой любимый праздник?
							</p> 
							<p>
								— «Новый Год»
							</p> 
							<p>
								— «8 Марта»
							</p> 
							<p>
								— «Масленица»
							</p> 
							<p>
								— «Ура, горячую воду дали!»
							</p> 
						</div>
					),
					buttons: [
						{
							text: 'Забавно!',
							handler: this._okClickHandler,
						}
					],
				},
			];

		}

		this._animationPlay(animationId, 'say_hello')
		.then( () => {

			this.setState({
				...this.state,
				...texts[getRandomInt(0, texts.length - 1)],
				//...texts[texts.length - 5],
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


		const texts = [
			{
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
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458104&bid=4738346&bn=4738346&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_36',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Сколько воды человек выпивает за свою жизнь?
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458105&bid=4738347&bn=4738347&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_37',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Ты знаешь, что наш организм на 65—70% состоит из воды?
						</p> 
						<p>
							Чтобы чувствовать себя хорошо, нам обязательно нужно поддерживать водный баланс в организма!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Без еды человек может прожить 6 недель, а без воды — всего 5-7 суток!
						</p> 
						<p>
							Хочешь узнать другие интересные факты о воде
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458106&bid=4738348&bn=4738348&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_38',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Мы с друзьями провели опыт с газировкой — сварили её! 
						</p> 
						<p>
							Хочешь узнать, что получилось?
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458107&bid=4738349&bn=4738349&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_39',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Привет! Знаешь, как растения реагируют на воду и на газировку? 
						</p> 
						<p>
							Посмотрим? 
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458108&bid=4738350&bn=4738350&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_40',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Какой цвет тебе больше нравится? Ты можешь выбрать бутылочку «Спортик» своего любимого цвета! 
						</p> 
						<p>
							Попробуешь?
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458109&bid=4738351&bn=4738351&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_41',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Больше всего я люблю «Спортик» за удобную спортивную крышечку! А ещё она бывает разных цветов! 
						</p> 
						<p>
							Посмотрим?
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458110&bid=4738353&bn=4738353&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_42',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Сколько воды тебе нужно пить каждый день? Ответь на мои вопросы, и я помогу тебе рассчитать! 
						</p> 
						<p>
							Начнём? 
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458111&bid=4738356&bn=4738356&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_43',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Расскажи немного о себе! А я помогу тебе рассчитать, сколько воды тебе нужно пить каждый день. 
						</p> 
						<p>
							Начнём? 
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458112&bid=4738365&bn=4738365&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_44',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Привет! Сегодня я хочу рассказать тебе, для чего нам нужно пить воду. 
						</p> 
						<p>
							Начнём? 
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458113&bid=4738372&bn=4738372&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_45',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Вода помогает нашему организму во всём! 
						</p> 
						<p>
							Хочешь узнать больше про это? 
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Хочу узнать!',
						handler: this._okClickHandler,
						href: 'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458114&bid=4738373&bn=4738373&rnd=' + Math.round(Math.random() * 1000000),
						adriver: 'button_46',
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Если ты не пьешь воду больше 3 часов, то становишься менее внимательным.
						</p> 
						<p>
							Не забывай выпивать немного воды на каждой перемене!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Ты знаешь, что огурцы и арбузы почти полностью состоят из воды?
						</p> 
						<p>
							Вот почему ими сложно утолить голод!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Вода покрывает большую часть нашей планеты — 70%!
						</p> 
						<p>
							Но только очень малая    часть —всего 1% — пригодна для питья.
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Под землей есть подземные озера, в которых хранится в 10 раз больше воды, чем на её поверхности!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Очень большой запас воды хранится в ледниках.
						</p> 
						<p>
							Если бы они все растаяли, многие города и страны оказались бы затопленными!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Каждый день человек использует в среднем 80–100 литров воды!
						</p> 
						<p>
							Это немало, так что нам нужно экономнее относиться к воде!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
			{
				text: (
					<div>
						<p>
							Тучи в небе — это тоже вода!
						</p> 
						<p>
							Толщина одной тучи может достигать 16 км!
						</p> 
					</div>
				),
				buttons: [
					{
						text: 'Понятно!',
						handler: this._okClickHandler,
					}
				],
			},
		];
		
		this._animationPlay(animationId, 'say_hello')
		.then( () => {

			this.setState({
				...this.state,
				...texts[getRandomInt(0, texts.length - 1)],
				//...texts[0],
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

	_okClick(o = {}){

		const { props } = this;

		this._clearBubble();
		this.props.appearanceCountUpdate();

		if (props.cookies.isfirst){
			props.cookiesFirstTimeIsShownUpdate();
		}


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
				this._animationPlay(animationId, 'drink')
				.then( () => this._animationPlay(animationId, 'hand_up') )
				.then( () => this._animationPlay(animationId, 'normal') )
				.catch( this._animationCatch )
				;
			},
			() => {
				this._animationPlay(animationId, 'show_bottle', 1000)
				.then( () => this._animationPlay(animationId, 'hide_bottle') )
				.then( () => this._animationPlay(animationId, 'hand_up') )
				.then( () => this._animationPlay(animationId, 'normal') )
				.catch( this._animationCatch )
				;
			},
			() => {
				this._animationPlay(animationId, 'winked')
				.catch( this._animationCatch )
				;
			},
			() => {
				this._animationPlay(animationId, 'eyes_blink')
				.catch( this._animationCatch )
				;
			},
		];

		let animationVariant = getRandomInt(1, animationVariants.length - 1);

		console.log(animationVariant);

		if (this.props.cookies.appearanceCount === 0){
			animationVariant = 0;
		}

		animationVariants[animationVariant]();


		if (typeof ar_sendPixel === 'function' && o.adriver){
			console.log(o.adriver);
			ar_sendPixel( o.adriver );
		}
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

	_okClickHandler = (o) => (e) => {
		this._okClick(o);
	}

	render(){
		const { props, state } = this;

		const links = [
			'http://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2456214&bid=4732813&bn=4732813&rnd=',


			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458104&bid=4738346&bn=4738346&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458105&bid=4738347&bn=4738347&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458106&bid=4738348&bn=4738348&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458107&bid=4738349&bn=4738349&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458108&bid=4738350&bn=4738350&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458109&bid=4738351&bn=4738351&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458110&bid=4738353&bn=4738353&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458111&bid=4738356&bn=4738356&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458112&bid=4738365&bn=4738365&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458113&bid=4738372&bn=4738372&rnd=',
			'https://ad.adriver.ru/cgi-bin/click.cgi?sid=1&bt=2&ad=605005&pid=2458114&bid=4738373&bn=4738373&rnd=',
		];

		const link = links[getRandomInt(0, links.length - 1)];


		return(
			<div className="sportik">

				<div ref="box" className="sportik__box"
				>

					<div className="sportik__text">

						<div className={ 'sportik-bubble ' +  ( state.text ? 'sportik-bubble--visible' : '' ) }
							ref="bubble"
						>

							<div className="sportik-bubble__inner">
								
								<div className="sportik-bubble__text" ref="bubbleText">	
								
									{state.text}		
								
								</div>

								<div className="sportik-bubble__buttons" 
									ref="bubbleButtons"				
								>

									{ state.buttons.map( (button, i) => (
										!button.href
										?										
										(
										<button
											key={'bubble-button' + i}
											className="sportik-button-blue"
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
											className="sportik-button-blue"
											onClick={button.handler({adriver: button.adriver})}
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

						<a href={link + Math.round(Math.random() * 1000000)} className="sportik__href">
							<canvas 
								ref="canvas" 
								width="200" 
								height="175" 
								className="sportik__canvas"
								//onClick={this._canvasClickHandler()}
							>
							</canvas>
						</a>

						<div className={ 'sportik__close-placeholder ' + (state.closeVisible ? 'sportik__close-placeholder--visible' : '') }
						>

							<button 
								className="sportik-button-close"
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

					<div className="sportik-friend"
						onClick={this._showHandler()}
					>

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
	cookiesFirstTimeIsShownUpdate: () => dispatch(cookiesActions.cookiesFirstTimeIsShownUpdate()), 
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
