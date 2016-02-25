import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Layout from 'layout';
import reducers from 'reducers';

const store = createStore( reducers );

ReactDOM.render(
	<Provider { ...{ store } }>
		<Layout />
	</Provider>,
	document.getElementById( 'root' )
);
