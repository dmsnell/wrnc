import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { identity } from 'lodash';

import Layout from 'layout';
import reducers from 'reducers';

const App = store => React.createClass( {
	render() {
		return (
			<Provider { ...{ store } }>
				<Layout { ...this.props } />
			</Provider>
		);
	}
} );

export const AppFactory = ( middleware = identity ) => {
	const store = createStore(
		reducers,
		middleware
	);

	return App( store );
};

export default AppFactory();
