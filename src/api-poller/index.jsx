import React, { PropTypes } from 'react';

import {
	startPolling,
	stopPolling
} from './poller';

const ApiPoller = React.createClass( {
	componentDidMount() {
		const { addNotes, removeNotes } = this.props;

		startPolling( addNotes, removeNotes );
	},

	componentWillUnmount() {
		stopPolling();
	},

	render() {
		return null;
	}
} );

ApiPoller.PropTypes = {
	addNotes: PropTypes.func,
	removeNotes: PropTypes.func
};

export default ApiPoller;
