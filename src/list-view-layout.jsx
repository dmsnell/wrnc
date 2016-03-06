import React from 'react';
import {
	constant
} from 'lodash';

import Filter from 'filter';
import FilterBarFactory from 'filter-bar';
import NoteListView from 'note-list-view';

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
					<Filter name="All" filter={ constant( true ) } />
					<Filter name="Unread" filter={ propEquals( 'read', 0 ) } />
					<Filter name="Comments" filter={ propEquals( 'type', 'comment' ) } />
					<Filter name="Follows" filter={ propEquals( 'type', 'follow' ) } />
					<Filter name="Likes" filter={ propEquals( 'type', 'like' ) } />
				</FilterBar>
				<div>
					{ notes.map( ( note, key ) => (
						<NoteListView {...{ key, note, selectNote } } />
					) ) }
				</div>
			</div>	
		);
	}
} );

export default ListViewLayout;
