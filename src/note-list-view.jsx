import React from 'react';
import {
	partial
} from 'lodash';
import moment from 'moment';

const NoteListView = React.createClass( {
	render() {
		const {
			note,
			selectNote
		} = this.props;
		
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const timestamp = moment( note.get( 'timestamp' ) ).fromNow();

		return (
			<div onClick={ partial( selectNote, note.get( 'id' ) ) }>
				<h1>{ subject }</h1>
				{ subjectExcerpt &&
					<h2>{ subjectExcerpt }</h2>
				}
				<h3>{ timestamp }</h3>
			</div>
		);
	}
} );

export default NoteListView;
