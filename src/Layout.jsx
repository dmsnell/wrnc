import { compose } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import ListViewLayout from 'list-view-layout';
import SingleViewLayout from 'single-view-layout';
import { WpcomConnection } from 'wpcom-connection';

import {
	addNotes, removeNotes, selectNote, unselectNote,
	updateFilter
} from 'actions';

const Layout = React.createClass( {
	render() {
		const {
			addNotes,
			note,
			notes,
			oAuthToken,
			removeNotes,
			selectedFilter,
			selectNote,
			unselectNote,
			updateFilter
		} = this.props;

		return (
			<div>
				<ApiPoller { ...{ addNotes, removeNotes } } />
				<WpcomConnection { ...{ oAuthToken } } />
				{ note
					? <SingleViewLayout {...{ note, unselectNote } } />
					: <ListViewLayout {...{ notes, selectNote, selectedFilter, updateFilter } } /> }
			</div>
		);
	}
} );

const mapStateToProps = ( { notes, selectedFilter, selectedNote } ) => ( {
	note: notes.get( selectedNote ),
	notes,
	selectedFilter
} );

const mapDispatchToProps = dispatch => ( {
	addNotes: compose( dispatch, addNotes ),
	removeNotes: compose( dispatch, removeNotes ),
	selectNote: compose( dispatch, selectNote ),
	unselectNote: compose( dispatch, unselectNote ),
	updateFilter: compose( dispatch, updateFilter )
} );

export default connect( mapStateToProps, mapDispatchToProps )( Layout );
