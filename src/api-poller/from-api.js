import {
	compose,
	fromPairs,
	get,
	getOr,
	map,
	toPairs
} from 'lodash/fp';

const subject = getOr( 'missing subject', 'subject[0]' );
const subjectExcerpt = getOr( undefined, 'subject[1]' );
const timestamp = compose( Date.parse, get( 'timestamp' ) );

const propertyGetters = {
	subject,
	subjectExcerpt,
	timestamp
};

const noteFromApi = note => {
	const runComputation = ( [ name, fn ] ) => [ name, fn( note ) ];
	const computeProperties = compose( fromPairs, map( runComputation ), toPairs );
	const computedProperties = computeProperties( propertyGetters );

	return {
		...note,
		...computedProperties
	};
};

export default ( { last_seen_time, notes }) => {
	return {
		lastSeenTime: last_seen_time,
		notes: [ ...notes ].map( noteFromApi )
	};
};
