import {
	compose,
	get,
	getOr,
	mapValues,
} from 'lodash/fp';

const mapNoticon = key => getOr( 'star', key, {
	'\uf814': 'mention',
	'\uf300': 'comment',
	'\uf801': 'follow',
	'\uf455': 'info',
	'\uf470': 'lock',
	'\uf806': 'stats',
	'\uf805': 'reblog',
	'\uf408': 'star',
	'\uf804': 'trophy',
	'\uf414': 'warning'
} );

const avatar = get( 'icon' );
const body = get( 'body' );
const icon = compose( mapNoticon, get( 'noticon' ) );
const id = get( 'id' );
const read = get( 'read' );
const subject = getOr( 'missing subject', 'subject[0]' );
const subjectExcerpt = getOr( undefined, 'subject[1]' );
const timestamp = compose( Date.parse, get( 'timestamp' ) );
const type = get( 'type' );

const propertyGetters = {
	avatar,
	body,
	icon,
	id,
	read,
	subject,
	subjectExcerpt,
	timestamp,
	type
};

const noteFromApi = note => mapValues( f => f( note ), propertyGetters );

export default ( { last_seen_time, notes }) => ( {
	lastSeenTime: last_seen_time,
	notes: notes.map( noteFromApi )
} );
