import React, { PropTypes } from 'react';

import {
	startPolling,
	stopPolling
} from './poller';

const ApiPoller = React.createClass( {
	componentDidMount() {
		const { addNote, removeNote } = this.props;
		
		startPolling( addNote, removeNote );
	},
	
	componentWillUnmount() {
		stopPolling();
	},
	
	render() {
		return null;
	}
} );

ApiPoller.PropTypes = {
	addNote: PropTypes.func,
	removeNote: PropTypes.func
};

export default ApiPoller;
