import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';

import {
	FILTER_SET,
	NOTE_ADD,
	NOTE_REMOVE,
	NOTE_SELECT
} from 'constants';

const addNote = ( state, note ) => state.set( note.id, fromJS( note ) );
const removeNote = ( state, id ) => state.delete( id );

const notes = ( state = Map(), action ) => {
	const { ids, notes, type } = action;

	switch ( type ) {
		case NOTE_ADD:
			return notes.reduce( addNote, state );

		case NOTE_REMOVE:
			return ids.reduce( removeNote, state );

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

const selectedNote = ( state = null, { type, id } ) => {
	if ( NOTE_SELECT !== type ) {
		return state;
	}

	return id;
};

export default combineReducers( {
	notes,
	selectedFilter,
	selectedNote
} );
