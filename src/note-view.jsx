import React from 'react';

require( 'note-view.scss' );

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;
		
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const body = note.get( 'body' );

		return (
			<div className="note-view">
				<div className="subject">{ subject }</div>
				{ subjectExcerpt &&
					<div className="subject excerpt">{ subjectExcerpt }</div> }
				{ body.map( ( block, key ) => (
					<p {...{ key } }>{ block.get( 'text' ) }</p>
				) ) }
			</div>
		);
	}
} );

export default NoteView;
