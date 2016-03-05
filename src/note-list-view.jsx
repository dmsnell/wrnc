import React from 'react';
import {
	partial
} from 'lodash';

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
			</div>
		);
	}
} );

export default NoteListView;
