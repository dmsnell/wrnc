import { Map } from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Layout from 'layout';
import reducers from 'reducers';

const initialState = {
	notes: Map()
};

const store = createStore( reducers, initialState );

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
