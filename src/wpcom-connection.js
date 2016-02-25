import React from 'react';
import wpcomFactory from 'wpcom';
import { fromJS } from 'immutable';

let state = fromJS( {
	oAuthToken: null
} );

export const wpcom = () => {
	return wpcomFactory( state.get( 'oAuthToken' ) );
};

export const WpcomConnection = React.createClass( {
	componentDidMount() {
		this.setToken();
	},
	
	componentDidUpdate() {
		this.setToken();
	},
	
	setToken() {
		const { oAuthToken } = this.props;

		state = state.set( 'oAuthToken', oAuthToken );
	},
	
	render() {
		return null;
	}
} );
