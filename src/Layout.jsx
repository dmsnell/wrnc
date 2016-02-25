import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import { WpcomConnection } from 'wpcom-connection';

import {
	NOTE_ADD,
	NOTE_REMOVE,
} from './constants';

const Layout = React.createClass( {
	render() {
		const {
			addNote,
			notes,
			oAuthToken,
			removeNote,
		} = this.props;
		
		return (
			<div>
				<ApiPoller { ...{ addNote, removeNote } } />
				<WpcomConnection { ...{ oAuthToken } } />
				<ul>
					{ notes.map( ( note, key ) => (
						<li { ...{ key } }>{ note.get( 'subject' ).first().get( 'text' ) }</li>
					) ) }
				</ul>
			</div>
		);
	}
} );

const mapStateToProps = state => ( {
	notes: state.notes.toList()
} );

const mapDispatchToProps = dispatch => ( {
	addNote: note => dispatch( {
		type: NOTE_ADD,
		note
	} ),
	removeNote: note => dispatch( {
		type: NOTE_REMOVE,
		note
	} )
} );

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
