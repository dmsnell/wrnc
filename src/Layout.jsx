import React from 'react';
import compose from 'ramda/src/compose';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import ListViewLayout from 'list-view-layout';
import SingleViewLayout from 'single-view-layout';

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
			removeNotes,
			selectedFilter,
			selectNote,
			unselectNote,
			updateFilter,
			wpcom
		} = this.props;

		return (
			<div>
				<ApiPoller { ...{ addNotes, removeNotes, wpcom } } />
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
