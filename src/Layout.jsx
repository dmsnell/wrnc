import {
	compose,
	constant,
	negate,
	property
} from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import FilterBar, { getFilter } from 'filter-bar';
import { WpcomConnection } from 'wpcom-connection';

import {
	addNote, removeNote,
	updateFilter
} from 'actions';

const Filter = React.createClass( {
	render() { return null; }
} );

const Layout = React.createClass( {
	render() {
		const {
			addNote,
			notes,
			oAuthToken,
			removeNote,
			selectedFilter,
			updateFilter
		} = this.props;
		
		return (
			<div>
				<ApiPoller { ...{ addNote, removeNote } } />
				<WpcomConnection { ...{ oAuthToken } } />
				<FilterBar { ...{ selectedFilter, updateFilter } }>
					<Filter name="All" filter={ constant( true ) } />
					<Filter name="Unread" filter={ note => note.get( 'read' ) != true } />
					<Filter name="Comments" filter={ note => note.get( 'type' ) === 'comment' } />
					<Filter name="Follows" filter={ note => note.get( 'type' ) === 'follow' } />
					<Filter name="Likes" filter={ note => note.get( 'type' ) === 'like' } />
				</FilterBar>
				<ul>
					{ notes.map( ( note, key ) => (
						<li { ...{ key } }>{ note.get( 'subject' ).first().get( 'text' ) }</li>
					) ) }
				</ul>
			</div>
		);
	}
} );

const mapStateToProps = ( { notes, selectedFilter }) => ( {
	notes: notes.toList().filter( getFilter( selectedFilter ) ),
	selectedFilter
} );

const mapDispatchToProps = dispatch => ( {
	addNote: compose( dispatch, addNote ),
	removeNote: compose( dispatch, removeNote ),
	updateFilter: compose( dispatch, updateFilter )
} );

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
