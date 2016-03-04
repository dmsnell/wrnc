import {
	compose,
	constant,
	partial
} from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import Filter from 'filter';
import FilterBar, { getFilter } from 'filter-bar';
import NoteView from 'note-view';
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
					? <div>
						  <button onClick={ unselectNote }>Back</button>
						  <NoteView note={ notes.find( propEquals( 'id', selectedNote ) ) } />
					  </div>
					: <div><FilterBar { ...{ selectedFilter, updateFilter } }>
					 	  <Filter name="All" filter={ constant( true ) } />
						  <Filter name="Unread" filter={ propEquals( 'read', 0 ) } />
						  <Filter name="Comments" filter={ propEquals( 'type', 'comment' ) } />
						  <Filter name="Follows" filter={ propEquals( 'type', 'follow' ) } />
						  <Filter name="Likes" filter={ propEquals( 'type', 'like' ) } />
					  </FilterBar>
					  <ul>
						  { notes.map( ( note, key ) => (
							  <li
								  onClick={ partial( selectNote, [ note.get( 'id' ) ] ) }
								  { ...{ key } }
							  >
								  { note.get( 'subject' ).first().get( 'text' ) }
							  </li>
						  ) ) }
					  </ul></div>
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
