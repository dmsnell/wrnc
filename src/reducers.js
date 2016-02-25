import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
	NOTE_ADD,
	NOTE_REMOVE,
} from 'constants';

const notes = ( state = Map(), action ) => {
	const { type, note } = action;
	
	switch ( type ) {
		case NOTE_ADD:
			return state
				.set( note.id, fromJS( note ) );
		
		case NOTE_REMOVE:
			return state
				.delete( note.id );
		
		default:
			return state;
	}
};

export default combineReducers( {
	notes
} );
