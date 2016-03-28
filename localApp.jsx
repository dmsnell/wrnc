import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { AppFactory } from 'src/app';
import RouteWrapper from 'routing-wrapper';
import OAuthApp from 'oauth-wrapper';

const RoutedApp = RouteWrapper( AppFactory, applyMiddleware( createLogger() ) );

const clientId = 45492;
const redirectPath = '/connect/response';

ReactDOM.render(
	<OAuthApp { ...{ clientId, redirectPath } }>
		<RoutedApp />
	</OAuthApp>,
	document.getElementById( 'root' )
);

