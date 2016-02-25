import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Layout from 'layout';
import reducers from 'reducers';

const store = createStore( reducers );

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
