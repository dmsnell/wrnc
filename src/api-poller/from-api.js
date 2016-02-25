import {
	map,
	partialRight
} from 'lodash';

const noteFromApi = note => {
	const { timestamp } = note;
	
	return {
		...note,
		timstamp: Date.parse( timestamp )
	};
};

const notesFromApi = partialRight( map, noteFromApi );

export default ( { last_seen_time, notes }) => {
	return {
		lastSeenTime: last_seen_time,
		notes: notesFromApi( notes )
	};
};
