import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
	FILTER_SET,
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

const selectedFilter = ( state = null, { type, name } ) => {
	if ( FILTER_SET !== type ) {
		return state;
	}
	
	return name;
};

export default combineReducers( {
	notes,
	selectedFilter
} );
