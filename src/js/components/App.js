import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../actions/page';


import Main from '../components/pages/Main';

class App extends React.Component {

	componentWillMount(){
		const { props } = this;
		props.setPage('start');
	}

	render(){
		const { props } = this;

		let page;

		switch(props.page){
			default:
				page = <Main />;
		}

		return page;
	}
}

const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setPage: (page) => dispatch(pageActions.setPage(page)),
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
