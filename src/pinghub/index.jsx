import React, { PropTypes } from 'react';

import {
	openConnection,
	closeConnection
} from './pinghub';

const PingHub = React.createClass( {
	componentDidMount() {
		const { requestNote, userId } = this.props;

		openConnection( requestNote );
	},

	componentWillUnmount() {
		closeConnection();
	},

	render() {
		return null;
	}
} );

PingHub.PropTypes = {
	requestNote: PropTypes.func,
	userId: PropTypes.number.isRequired
};

export default PingHub;
