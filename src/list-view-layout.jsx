import React from 'react';
import always from 'ramda/src/always';
import range from 'ramda/src/range';

import FilterBarFactory, { Filter } from 'filter-bar';
import NoteListView from 'note-list-view';
import ListViewPlaceholder from 'note-list-placeholder';
import Gridicon from 'gridicons';
import GroupedList, { GroupHeader } from 'grouped-list';
import {
	isPlaceholder,
	fromToday,
	fromYesterday,
	before2Days,
	before7Days
} from 'list-group-filters';

require( 'list-view-layout.scss' );

const { FilterBar, getFilter } = FilterBarFactory();

const compareTimestamps = ( a, b ) => b.get( 'timestamp' ) - a.get( 'timestamp' );
const propEquals = ( prop, value ) => a => a.get( prop ) === value;

const transformProps = props => {
	const {
		notes,
		selectedFilter
	} = props;

	return {
		...props,
		notes: notes.toList().filter( getFilter( selectedFilter ) ).sort( compareTimestamps )
	};
};

const ListViewLayout = React.createClass( {
	render() {
		const {
			notes,
			selectNote,
			selectedFilter,
			updateFilter
		} = transformProps( this.props );

		return (
			<div>
				<FilterBar { ...{ selectedFilter, updateFilter } }>
					<Filter name="All" filter={ always( true ) } />
					<Filter name="Unread" filter={ propEquals( 'read', 0 ) } />
					<Filter name="Comments" filter={ propEquals( 'type', 'comment' ) } />
					<Filter name="Follows" filter={ propEquals( 'type', 'follow' ) } />
					<Filter name="Likes" filter={ propEquals( 'type', 'like' ) } />
				</FilterBar>
				<GroupedList>
					<GroupHeader filter={ isPlaceholder }>
						<Gridicon icon="cloud-download" /> Loading notifications…
					</GroupHeader>
					<GroupHeader filter={ fromToday }>
						<Gridicon icon="time" /> Today
					</GroupHeader>
					<GroupHeader filter={ fromYesterday }>
						<Gridicon icon="time" /> Yesterday
					</GroupHeader>
					<GroupHeader filter={ before2Days }>
						<Gridicon icon="time" /> Older than 2 days
					</GroupHeader>
					<GroupHeader filter={ before7Days }>
						<Gridicon icon="time" /> Older than a week
					</GroupHeader>

					{ ! notes.toList().size &&
						range(1, 8).map( key =>
							<ListViewPlaceholder { ...{ key } } /> ) }

					{ notes.map( ( note, key ) => (
						<NoteListView {...{ key, note, selectNote } } />
					) ) }
				</GroupedList>
			</div>
		);
	}
} );

export default ListViewLayout;
