import React from 'react';
import {
	constant
} from 'lodash';

import Filter from 'filter';
import FilterBar from 'filter-bar';
import NoteListView from 'note-list-view';

const propEquals = ( prop, value ) => a => a.get( prop ) === value;

const ListViewLayout = React.createClass( {
	render() {
		const {
			notes,
			selectNote,
			selectedFilter,
			updateFilter
		} = this.props;
		
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
