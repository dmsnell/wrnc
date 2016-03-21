import React from 'react';

require( 'note-view.scss' );

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;

		const header = note.getIn( [ 'header', 'text' ] );
		const headerExcerpt = note.getIn( [ 'headerExcerpt', 'text' ] );
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const body = note.get( 'body' );

		return (
			<div className="note-view">
				<div className="header">{ header }</div>
				{ headerExcerpt &&
					<div className="header excerpt">{ headerExcerpt }</div> }
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
