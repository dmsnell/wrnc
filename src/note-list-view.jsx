import React from 'react';
import {
	partial
} from 'lodash';
import moment from 'moment';

require( 'note-list-view.scss' );

const NoteListView = React.createClass( {
	render() {
		const {
			note,
			selectNote
		} = this.props;
		
		const selectThisNote = partial( selectNote, note.get( 'id' ) );
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const timestamp = moment( note.get( 'timestamp' ) ).fromNow();

		return (
			<div className="note-list-view" onClick={ selectThisNote }>
				<div className="subject">{ subject }</div>
				{ subjectExcerpt &&
					<div className="subject excerpt">{ subjectExcerpt }</div> }
				<div className="timestamp">{ timestamp }</div>
			</div>
		);
	}
} );

export default NoteListView;
