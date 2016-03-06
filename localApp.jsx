import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { AppFactory } from 'src/app';
import RoutedApp from 'routing-wrapper';

import {
	oAuthToken
} from './config.js';

ReactDOM.render(
	RoutedApp(
		AppFactory,
		applyMiddleware( createLogger() )
	)( { ...{ oAuthToken } } ),
	document.getElementById( 'root' )
);
