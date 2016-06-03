import apply from 'ramda/src/apply';
import compose from 'ramda/src/compose';
import defaultTo from 'ramda/src/defaultTo';
import flip from 'ramda/src/flip';
import has from 'ramda/src/has';
import head from 'ramda/src/head';
import isNil from 'ramda/src/isNil';
import mapObjIndexed from 'ramda/src/mapObjIndexed';
import map from 'ramda/src/map';
import nth from 'ramda/src/nth';
import of from 'ramda/src/of';
import prop from 'ramda/src/prop';
import propOr from 'ramda/src/propOr';
import reject from 'ramda/src/reject';

import { parseBlock } from './block-parser';

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
const body = compose( map( parseBlock ), prop( 'body' ) );
const hasReplied = compose( has( 'reply_comment' ), propOr( {}, 'ids' ), propOr( {}, 'meta' ) );
const header = compose( defaultTo( [] ), head, map( parseBlock ), reject( isNil ), of, head, propOr( [], 'header' ) );
const headerExcerpt = compose( nth( 1 ), propOr( [], 'header' ) );
const icon = compose( mapNoticon, prop( 'noticon' ) );
const id = prop( 'id' );
const read = prop( 'read' );
const subject = compose( head, map( parseBlock ), of, head, prop( 'subject' ) );
const subjectExcerpt = compose( nth( 1 ), propOr( [], 'subject' ) );
const timestamp = compose( Date.parse, prop( 'timestamp' ) );
const title = prop( 'title' );
const type = prop( 'type' );

const propertyGetters = {
	avatar,
	body,
	hasReplied,
	header,
	headerExcerpt,
	icon,
	id,
	read,
	subject,
	subjectExcerpt,
	timestamp,
	title,
	type
};

const transformerFrom = flip( mapObjIndexed ); // {k: a} -> (a -> b) -> {k: b}
const applicator = compose( flip( apply ), of ); // a -> ((a -> b) -> b)
const noteFromApi = compose( transformerFrom( propertyGetters ), applicator );

export default ( { last_seen_time, notes }) => ( {
	lastSeenTime: last_seen_time,
	notes: notes.map( noteFromApi )
} );
