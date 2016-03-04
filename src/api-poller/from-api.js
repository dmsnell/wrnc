import {
	map
} from 'lodash/fp';

const noteFromApi = note => {
	const { timestamp } = note;
	
	return {
		...note,
		timstamp: Date.parse( timestamp )
	};
};

export default ( { last_seen_time, notes }) => {
	return {
		lastSeenTime: last_seen_time,
		notes: [ ...notes ].map( noteFromApi )
	};
};
