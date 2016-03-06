import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { AppFactory } from 'src/app';
const App = AppFactory(
	applyMiddleware( createLogger() )
);

import {
	oAuthToken
} from './config.js';

ReactDOM.render(
	<App { ...{
		oAuthToken
	} } />,
	document.getElementById( 'root' )
);
