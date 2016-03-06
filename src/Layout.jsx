import {
	compose
} from 'lodash/fp';
import React from 'react';
import { connect } from 'react-redux';

import ApiPoller from 'api-poller';
import ListViewLayout from 'list-view-layout';
import SingleViewLayout from 'single-view-layout';
import { WpcomConnection } from 'wpcom-connection';

import {
	addNote, removeNote, selectNote, unselectNote,
	updateFilter
} from 'actions';

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
					: <ListViewLayout {...{ notes, selectNote, selectedFilter, updateFilter } } /> }
			</div>
		);
	}
} );

const mapStateToProps = ( { notes, selectedFilter, selectedNote } ) => ( {
	notes,
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
