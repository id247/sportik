import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { PromoOptions } from 'appSettings';
import * as cookiesActions from '../../../actions/cookies'

import styles from './main.scss';

import { TweenMax, TimelineMax } from 'gsap';

class PersHidden extends React.Component {

	componentDidMount(){

		this._box = this.refs.box;

		this._show();
	}

	_show(){

		// var tl = new TimelineMax();
		
		// tl.fromTo( this._box, 1, {
		// 	right: '-500px',
		// 	transform: 'scale(.2)',
		// },{
		// 	right: '50px',
		// 	transform: 'scale(1)',
		// });
	}

	_hide(){
		
		// TweenMax.to( this._box, .5, {
		// 	right: '-500px',
		// });
		// const timestamp = new Date(new Date().getTime() + .5 * 60 * 1000).getTime();

		// console.log(timestamp);

		// this.props.cookiesSetHiddenUntil(timestamp);

	}

	_closeHandler = () => (e) => {
		e.preventDefault();
		this._hide();
	}

	render(){
		const { props } = this;

		console.log('fff');

		return(

			<div styleName="sportik">

				<a href="https://ad.dnevnik.ru/promo/sportik" styleName="sportik__friends-list">



					<div styleName="friend"
						//onClick={this._showHandler()}
					>

						<div styleName="friend__title">
							Выбери себе <br/>
							друга
						</div>

					</div>
				
					<div styleName="friends-list">

						<div styleName="friends-list__item--1"></div>
						<div styleName="friends-list__item--2"></div>
						<div styleName="friends-list__item--3"></div>
						<div styleName="friends-list__item--4"></div>

					</div>
					
				</a>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//logout: () => dispatch(asyncActions.logout()), 
	cookiesSetHiddenUntil: (timestamp) => dispatch(cookiesActions.cookiesSetHiddenUntil(timestamp)), 
});

PersHidden.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(PersHidden, styles));
