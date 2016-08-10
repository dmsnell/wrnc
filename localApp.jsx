import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import { AppFactory } from 'src/app';
import RouteWrapper from 'routing-wrapper';
import OAuthApp from 'oauth-wrapper';

const RoutedApp = RouteWrapper( AppFactory, applyMiddleware( createLogger() ) );

const clientId = 35604;
const redirectPath = '/connect/response';

const TestingApp = AppFactory().App;

const containerStyle = {
	width: '50%',
	height: '100%',
	float: 'left',
	overflow: 'scroll',
	position: 'relative'
}

const Layout = () => (
	<div>
		<div style={ containerStyle }>
			<OAuthApp { ...{ clientId, redirectPath, cookieKey: 'oAuthKey' } } >
				<RoutedApp />
			</OAuthApp>
		</div>
		<div style={ containerStyle }>
			<OAuthApp { ...{ clientId: 46104, redirectPath: '/connect/testResponse', cookieKey: 'testOAuthKey' } }>
				<TestingApp />
			</OAuthApp>
		</div>
	</div>
)

ReactDOM.render(
	<Layout />,
	document.getElementById( 'root' )
);
