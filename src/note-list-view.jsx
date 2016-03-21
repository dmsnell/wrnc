import React from 'react';
import Gridicon from 'gridicons';
import { partial } from 'ramda';
import moment from 'moment';

import Avatar from 'avatar';

require( 'note-list-view.scss' );

const NoteListView = React.createClass( {
	render() {
		const {
			note,
			selectNote
		} = this.props;

		const selectThisNote = partial( selectNote, [ note.get( 'id' ) ] );

		const avatar = note.get( 'avatar' );
		const hasReplied = note.get( 'hasReplied' );
		const icon = note.get( 'icon' );
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const timestamp = moment( note.get( 'timestamp' ) ).fromNow();

		return (
			<div className="note-list-view" onClick={ selectThisNote }>
				<div>
					<Avatar src={ avatar } />
					<Gridicon className="icon" { ...{ icon } } />
				</div>
				<div className="subject">
					{ hasReplied &&
						<Gridicon icon="reply" size={ 16 } /> }
					{ subject }
				</div>
				{ subjectExcerpt &&
					<div className="subject excerpt">{ subjectExcerpt }</div> }
				<div className="timestamp">{ timestamp }</div>
			</div>
		);
	}
} );

export default NoteListView;
