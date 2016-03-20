import React, { PropTypes } from 'react';
import { always } from 'ramda';
import wpcomFactory from 'wpcom';

export const WpcomConnection = React.createClass( {
	getInitialState: () => ( {
		oAuthToken: null
	} ),

	componentWillMount() {
		const { oAuthToken } = this.props;

		this.setToken( oAuthToken );
	},

	componentWillReceiveProps( { oAuthToken } ) {
		if ( oAuthToken === this.state.oAuthToken ) {
			return;
		}

		this.setToken( oAuthToken );
	},

	announceUpdate() {
		const { onAuthUpdated = always( null ) } = this.props;
		const { oAuthToken } = this.state;

		onAuthUpdated( wpcomFactory( oAuthToken ) );
	},

	setToken( oAuthToken ) {
		this.setState( {
			oAuthToken
		}, this.announceUpdate )
	},

	render() {
		return null;
	}
} );

WpcomConnection.propTypes = {
	oAuthToken: PropTypes.string,
	onAuthUpdated: PropTypes.func
};

export default WpcomConnection;
