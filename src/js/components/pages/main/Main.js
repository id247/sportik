import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import { PromoOptions } from 'appSettings';

import styles from './main.scss';

import { TweenMax, TimelineMax } from 'gsap';


class Main extends React.Component {

	componentDidMount(){
		this._show();
	}

	_show(){
		const { box, sportik__text } = this.refs;

		var tl = new TimelineMax();
		
		tl.fromTo( box, 1, {
			right: '-500px',
			transform: 'scale(.2)',
		},{
			right: '50px',
			transform: 'scale(1)',
		});
	}

	_hide(){
		const { box } = this.refs;
		
		TweenMax.to( box, .5, {
			right: '-500px',
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

				<span styleName="image"></span>


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
