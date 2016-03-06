import {
	partial,
	castArray
} from 'lodash';

import {
	FILTER_SET,
	NOTE_ADD,
	NOTE_REMOVE,
	NOTE_SELECT
} from 'constants';

export const addNotes = notes => ( {
	type: NOTE_ADD,
	notes: castArray( notes )
} );

export const removeNotes = ids => ( {
	type: NOTE_REMOVE,
	ids: castArray( ids )
} );

export const selectNote = id => ( {
	type: NOTE_SELECT,
	id
} );

export const unselectNote = partial( selectNote, null );

export const updateFilter = name => ( {
	type: FILTER_SET,
	name
} );
