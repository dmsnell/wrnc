import React from 'react';

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;
		
		const subject = note.getIn( [ 'subject', 'text' ] );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const body = note.get( 'body' );

		return (
			<div>
				<h1>{ subject }</h1>
				{ subjectExcerpt &&
					<h2>{ subjectExcerpt }</h2> }
				{ body.map( ( block, key ) => (
					<p {...{ key } }>{ block.get( 'text' ) }</p>
				) ) }
			</div>
		);
	}
} );

export default NoteView;
