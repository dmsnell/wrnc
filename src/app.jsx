import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { identity } from 'ramda';

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

	return {
		App: App( store ),
		store
	};
};

export default AppFactory().App;
