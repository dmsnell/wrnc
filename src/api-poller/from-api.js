import {
	apply,
	compose,
	flip,
	has,
	head,
	mapObjIndexed,
	nth,
	of,
	prop,
	propOr
} from 'ramda';

const mapNoticon = key => propOr( 'star', key, {
	'\uf814': 'mention',
	'\uf300': 'comment',
	'\uf801': 'add',
	'\uf455': 'info',
	'\uf470': 'lock',
	'\uf806': 'stats',
	'\uf805': 'reblog',
	'\uf408': 'star',
	'\uf804': 'trophy',
	'\uf414': 'warning'
} );

const avatar = prop( 'icon' );
const body = prop( 'body' );
const hasReplied = compose( has( 'reply_comment' ), propOr( {}, 'ids' ), propOr( {}, 'meta' ) );
const icon = compose( mapNoticon, prop( 'noticon' ) );
const id = prop( 'id' );
const read = prop( 'read' );
const subject = compose( head, prop( 'subject' ) );
const subjectExcerpt = compose( nth( 1 ), propOr( [], 'subject' ) );
const timestamp = compose( Date.parse, prop( 'timestamp' ) );
const type = prop( 'type' );

const propertyGetters = {
	avatar,
	body,
	hasReplied,
	icon,
	id,
	read,
	subject,
	subjectExcerpt,
	timestamp,
	type
};

const transformerFrom = flip( mapObjIndexed ); // {k: a} -> (a -> b) -> {k: b}
const applicator = compose( flip( apply ), of ); // a -> ((a -> b) -> b)
const noteFromApi = compose( transformerFrom( propertyGetters ), applicator );

export default ( { last_seen_time, notes }) => ( {
	lastSeenTime: last_seen_time,
	notes: notes.map( noteFromApi )
} );
