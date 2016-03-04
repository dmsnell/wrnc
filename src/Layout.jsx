import {
	compose,
	constant
} from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import Filter from 'filter';
import FilterBar, { getFilter } from 'filter-bar';
import NoteListView from 'note-list-view';
import SingleViewLayout from 'single-view-layout';
import { WpcomConnection } from 'wpcom-connection';

import {
	addNote, removeNote, selectNote, unselectNote,
	updateFilter
} from 'actions';

const propEquals = ( prop, value ) => a => a.get( prop ) === value;

const Layout = React.createClass( {
	render() {
		const {
			addNote,
			notes,
			oAuthToken,
			removeNote,
			selectedFilter,
			selectNote,
			selectedNote,
			unselectNote,
			updateFilter
		} = this.props;
		
		return (
			<div>
				<ApiPoller { ...{ addNote, removeNote } } />
				<WpcomConnection { ...{ oAuthToken } } />
				{ selectedNote
					? <SingleViewLayout {...{ notes, selectedNote, unselectNote } } />
					: <div>
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
				}
			</div>
		);
	}
} );

const mapStateToProps = ( { notes, selectedFilter, selectedNote } ) => ( {
	notes: notes.toList().filter( getFilter( selectedFilter ) ),
	selectedFilter,
	selectedNote
} );

const mapDispatchToProps = dispatch => ( {
	addNote: compose( dispatch, addNote ),
	removeNote: compose( dispatch, removeNote ),
	selectNote: compose( dispatch, selectNote ),
	unselectNote: compose( dispatch, unselectNote ),
	updateFilter: compose( dispatch, updateFilter )
} );

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
