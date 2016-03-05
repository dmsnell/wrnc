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
		
		const hasSubjectExcerpt = note.has( 'subjectExcerpt' );

		return (
			<div onClick={ partial( selectNote, note.get( 'id' ) ) }>
				<h1>{ note.getIn( [ 'subject', 'text' ] ) }</h1>
				{ hasSubjectExcerpt &&
					<h2>{ note.getIn( [ 'subjectExcerpt', 'text' ] ) }</h2>
				}
				<h3>{ moment( note.get( 'timestamp' ) ).fromNow() }</h3>
			</div>
		);
	}
} );

export default NoteListView;
