import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Cookies from 'cookies-js';
import {
	compose,
	fromPairs,
	map,
	prop,
	split,
	tail
} from 'ramda';

require( './oauth-wrapper.scss' );

const baseUrl = 'https://public-api.wordpress.com/oauth2/authorize';

const getToken = compose(
	decodeURIComponent,
	prop( 'access_token' ),
	fromPairs,
	map( split( '=' ) ),
	split( '&' ),
	tail
);

export const Redirector = ( clientId, redirectPath ) => React.createClass( {
	componentWillMount() {
		const redirectUri = `${ window.location.origin }${ redirectPath }`;
		const uri = `${ baseUrl }?client_id=${ clientId }&redirect_uri=${ redirectUri }&response_type=token&scope=global`;

		window.location.replace( uri );
	},

	render: () => null
} );

export const Redirected = receiveToken => React.createClass( {
	componentWillMount() {
		receiveToken( getToken( window.location.hash ) );
	},

	render: () => null
} );

export const oAuthWrapper = React.createClass( {
	getInitialState() {
		return {
			oAuthToken: Cookies.get( this.props.cookieKey )
		};
	},

	clearToken() {
		Cookies.expire( this.props.cookieKey );
		window.location.replace( '/' );
	},

	receiveToken( cookieKey, oAuthToken ) {
		Cookies.set( cookieKey, oAuthToken );
		window.location.replace( '/' );
	},

	render() {
		const { children, clientId, cookieKey, redirectPath } = this.props;
		const { oAuthToken } = this.state;

		if ( ! oAuthToken ) {
			return (
				<Router history={ browserHistory }>
					<Route path="/" component={ Redirector( clientId, redirectPath ) } />
					<Route path={ redirectPath } component={ Redirected( token => this.receiveToken( cookieKey, token ) ) } />
				</Router>
			);
		}

		return (
			<div>
				<div className="logout-button" onClick={ this.clearToken }>
					Logout
				</div>
				{ React.cloneElement( children, { oAuthToken } ) }
			</div>
		);
	}
} );

export default oAuthWrapper;
