import fromApi from './from-api';
import { wpcom } from 'wpcom-connection';

const noop = () => null;

const state = {
	addNotes: noop,
	delay: 20 * 1000,
	removeNotes: noop,
	timer: null
};

const fetchAll = () => wpcom()
	.req.get( {
		path: '/notifications/',
		apiVersion: '1.1'
	}, {
		number: 100
	} )
	.then( fromApi );

async function refreshNotes() {
	const { addNotes } = state;
	const { notes } = await fetchAll();

	addNotes( notes );
}

const pollingLoop = () => {
	refreshNotes();

	state.timer = setTimeout( pollingLoop, state.delay );
};

export const startPolling = ( addNotes = noop, removeNotes = noop ) => {
	if ( null !== state.timer ) {
		return;
	}

	Object.assign( state, {
		timer: setTimeout( pollingLoop, 0 ),
		addNotes,
		removeNotes
	} );
};

export const stopPolling = () => {
	if ( null === state.timer ) {
		return;
	}

	clearTimeout( state.timer );

	Object.assign( state, {
		timer: null,
		addNotes: noop,
		removeNotes: noop
	} );
};
