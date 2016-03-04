import {
	FILTER_SET,
	NOTE_ADD,
	NOTE_REMOVE
} from 'constants';

export const addNote = note => ( {
	type: NOTE_ADD,
	note
} );

export const removeNote = note => ( {
	type: NOTE_REMOVE,
	note
} );

export const updateFilter = name => ( {
	type: FILTER_SET,
	name
} );
