import React from 'react';
import { Provider } from 'react-redux';

import App 			from '../components/App';

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store} >		
				<App mainLink={this.props.mainLink} paddingTop={this.props.paddingTop} />
			</Provider>
		);
	}
}

export default Root;

