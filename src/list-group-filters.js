import moment from 'moment';
import and from 'ramda/src/and';
import ap from 'ramda/src/ap';
import apply from 'ramda/src/apply';
import invoker from 'ramda/src/invoker';

const timeRange = ( end, start ) => ( { props: { note } } ) => note && apply( and, ap(
	[
		invoker( 1, 'isAfter')( start ),
		invoker( 1, 'isSameOrBefore')( end )
	],
	[ moment( note.get( 'timestamp' ) ) ] )
);

export const fromToday = timeRange(
	moment().add( 1, 'days' ),
	moment().startOf( 'day' )
);

export const fromYesterday = timeRange(
	moment().subtract( 1, 'days' ).endOf( 'day' ),
	moment().subtract( 1, 'days' ).startOf( 'day' )
);

export const before2Days = timeRange(
	moment().subtract( 2, 'days' ).endOf( 'day' ),
	moment().subtract( 7, 'days' )
);

export const before7Days = timeRange(
	moment().subtract( 7, 'days' ),
	0
);

export const isPlaceholder = element =>
	element.type.displayName === 'NoteListPlaceholder';
