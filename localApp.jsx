import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';
import { fromJSON, toJSON } from 'transit-immutable-js';

import { AppFactory } from 'src/app';
import RouteWrapper from 'routing-wrapper';
import OAuthApp from 'oauth-wrapper';

const containerStyle = {
	width: '50%',
	height: '100%',
	float: 'left',
	position: 'relative'
}

const RoutedApp = props => (
	<div style={ containerStyle }>
		{ RouteWrapper( AppFactory, applyMiddleware( createLogger() ) )( props ) }
	</div>
);

const statePersister = persistState( null, {
	serialize: toJSON,
	deserialize: fromJSON
} );

const CachedApp = props => (
	<div style={ containerStyle }>
		{ React.createElement( AppFactory( statePersister ).App, props ) }
	</div>
);

const clientId = 35604;
const redirectPath = '/connect/response';

const Tee = givenProps => {
	const { children, ...props } = givenProps;

	return (
		<div>
			{ React.Children.map( children, Child => React.cloneElement( Child, props ) ) }
		</div>
	);
}

ReactDOM.render(
	<OAuthApp { ...{ clientId, redirectPath } }>
		<Tee>
			<RoutedApp />
			<CachedApp />
		</Tee>
	</OAuthApp>,
	document.getElementById( 'root' )
);
