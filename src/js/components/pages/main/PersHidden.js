import React from 'react';
import { connect } from 'react-redux';
import { PromoOptions } from 'appSettings';
import * as cookiesActions from '../../../actions/cookies'

//import { TweenMax, TimelineMax } from 'gsap';

class PersHidden extends React.Component {

	componentWillMount(){
		this.props.paddingTop.style.height = '200px';

		//this.isBouns = document.getElementById('app').getAttribute('data-bonus');
	}
	
	componentDidMount(){

		// if (this.isBonus){
		// 	if (typeof ar_sendPixel === 'function' && o.adriver){
		// 		ar_sendPixel( o.adriver );
		// 	}
		// }

	}

	render(){
		const { props } = this;

		return(

			<div className="sportik">

				
				{/*<a href={props.mainLink} target="_balnk" className="sportik__friends-list friends-list">

					<div className="friends-list__bubble"></div>
					<div className="friends-list__item friends-list__item--1"></div>
					<div className="friends-list__item friends-list__item--2"></div>
					<div className="friends-list__item friends-list__item--3"></div>
					<div className="friends-list__item friends-list__item--4"></div>
					
				</a>*/}

				<a href={props.mainLink} target="_balnk" className="sportik__brand sportik-brand">					
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

export default connect(mapStateToProps, mapDispatchToProps)(PersHidden);
