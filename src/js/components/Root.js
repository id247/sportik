import React from 'react';
import { Provider } from 'react-redux';

import App 			from '../components/App';

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<App />
			</Provider>
		);
	}
}

export default Root;

