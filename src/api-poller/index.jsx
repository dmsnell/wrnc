import React, { PropTypes } from 'react';
import always from 'ramda/src/always';

import fromApi from './from-api';

const noop = always( null );

const fetchNotes = ( wpcom, options ) =>
	wpcom
		.req
		.get( {
			path: '/notifications/',
			apiVersion: '1.1'
		}, options )
		.then( fromApi );

const ApiPoller = React.createClass( {
	getInitialState: () => ( {
		timer: null
	} ),

	componentDidMount() {
		this.start();
	},

	componentDidUpdate() {
		this.start();
	},

	componentWillUnmount() {
		this.stop();
	},

	async pollingLoop() {
		const {
			addNotes = noop,
			delay = 20 * 1000,
			wpcom
		} = this.props;

		const { notes } = await fetchNotes( wpcom, {
			number: 100
		} );

		addNotes( notes );

		this.setState( {
			timer: setTimeout( this.pollingLoop, delay )
		} );
	},

	start() {
		const { wpcom } = this.props;
		const { timer } = this.state;

		if ( ! wpcom ) {
			return;
		}

		if ( null !== timer ) {
			return;
		}

		this.setState( {
			timer: setTimeout( this.pollingLoop, 0 )
		} );
	},

	stop() {
		const { timer } = this.state;

		if ( null === timer ) {
			return;
		}

		clearTimeout( timer );

		this.setState( {
			timer: null
		} );
	},

	render() {
		return null;
	}
} );

ApiPoller.PropTypes = {
	delay: PropTypes.number.isRequired,
	addNotes: PropTypes.func,
	removeNotes: PropTypes.func,
	wpcom: PropTypes.func
};

export default ApiPoller;
