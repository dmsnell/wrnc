import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import Layout from 'layout';
import reducers from 'reducers';

const logger = createLogger();
const store = createStore(
	reducers,
	applyMiddleware( logger )
);

const App = React.createClass( {
	render() {
		return (
			<Provider { ...{ store } }>
				<Layout { ...this.props } />
			</Provider>
		);
	}
} );

export default App;
