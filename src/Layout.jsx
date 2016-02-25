import React from 'react';
import { connect } from 'react-redux';

import {
	UPDATE_MESSAGE
} from 'constants';

const Layout = React.createClass( {
	render() {
		const { message, updateMessage } = this.props;
		
		return (
			<div>
				<p onClick={ updateMessage.bind( null, 'Done!' ) }>Layout building…</p>
				<p>{ message }</p>
			</div>
		);
	}
} );

const mapStateToProps = state => ( {
	message: state.message
} );

const mapDispatchToProps = dispatch => ( {
	updateMessage: message => dispatch( {
		type: UPDATE_MESSAGE,
		message
	} )
} );

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
