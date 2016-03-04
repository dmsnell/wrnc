import {
	FILTER_SET,
	NOTE_ADD,
	NOTE_REMOVE,
	NOTE_SELECT
} from 'constants';

export const addNote = note => ( {
	type: NOTE_ADD,
	note
} );

export const removeNote = note => ( {
	type: NOTE_REMOVE,
	note
} );

export const selectNote = id => ( {
	type: NOTE_SELECT,
	id
} );

export const updateFilter = name => ( {
	type: FILTER_SET,
	name
} );
