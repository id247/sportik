import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import * as pageActions from '../actions/page';
import * as cookiesActions from '../actions/cookies';

import Main from '../components/pages/main/Main';
import PersHidden from '../components/pages/main/PersHidden';

class App extends React.Component {

	componentWillMount(){
		const { props, state } = this;
		
		this._getCookie();

		//console.log(props.cookies);

	}

	componentWillUpdate(){
		const { props, state } = this;

	//	console.log(props.cookies);

		//console.log(new Date().getTime());

		if (props.cookies && props.cookies.chosenPers && props.cookies.chosenPers !== '44'){
			props.setPage('pers');
		}else{
			props.setPage('pers-hidden');
			//props.setPage('pers');
		}	
	}

	_getCookie(){
		this.props.cookiesRead();	
	}

	render(){
		const { props } = this;

		let page;

	//	console.log(props.page);

		switch(props.page){
			case 'pers':
				page = <Main paddingTop={props.paddingTop} />;
				break;
			case 'pers-hidden':
				page = <PersHidden mainLink={props.mainLink} paddingTop={props.paddingTop} />;
				break;
			default:
				page = null;
		}

		return page;
	}
}

const mapStateToProps = (state, ownProps) => ({
	page: state.page,
	cookies: state.cookies,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPage: (page) => dispatch(pageActions.setPage(page)),
	cookiesRead: () => dispatch(cookiesActions.cookiesRead()),
});

App.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
