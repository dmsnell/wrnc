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
		
		const hasSubjectExcerpt = note.get( 'subject' ).count() > 1;
		
		return (
			<div onClick={ partial( selectNote, note.get( 'id' ) ) }>
				<h1>{ note.get( 'subject' ).first().get( 'text' ) }</h1>	
				{ hasSubjectExcerpt &&
					<h2>{ note.get( 'subject' ).last().get( 'text' ) }</h2>
				}
			</div>
		);
	}
} );

export default NoteListView;
