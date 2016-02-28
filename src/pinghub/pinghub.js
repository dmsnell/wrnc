import { noop } from 'lodash';

import { wpcom } from 'wpcom-connection';

const state = {
	requestNote: noop
};

const receiveMessage = message => {
	console.log( message );
};

export const openConnection = ( requestNote ) => {
	console.log( wpcom() );
	wpcom().pinghub.connect(
		'/wpcom/me/newest-note-data',
		receiveMessage
	);
};

export const closeConnection = () => {
	Object.assign( state, {
		requestNote: noop
	} );
};
