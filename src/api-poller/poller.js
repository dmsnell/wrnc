import {
	noop
} from 'lodash';

import fromApi from './from-api';
import { wpcom } from 'wpcom-connection';

const state = {
	addNote: noop,
	delay: 20 * 1000,
	removeNote: noop,
	timer: null
};

const fetchAll = () => wpcom()
	.req.get( {
		path: '/notifications/',
		apiVersion: '1.1'
	}, {
		number: 10
	} )
	.then( fromApi );

async function refreshNotes() {
	const { addNote } = state;
	const { notes } = await fetchAll();
	
	notes.forEach( addNote );
}

const pollingLoop = () => {
	refreshNotes();
	
	state.timer = setTimeout( pollingLoop, state.delay );
};

export const startPolling = ( addNote = noop, removeNote = noop ) => {
	if ( null !== state.timer ) {
		return;
	}
	
	Object.assign( state, {
		timer: setTimeout( pollingLoop, 0 ),
		addNote,
		removeNote
	} );
};

export const stopPolling = () => {
	if ( null === state.timer ) {
		return;
	}
	
	clearTimeout( state.timer );
	
	Object.assign( state, {
		timer: null,
		addNote: noop,
		removeNote: noop
	} );
};
