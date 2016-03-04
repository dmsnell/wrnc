import React from 'react';

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;
		
		return (
			<div>
				<h1>{ note.get( 'subject' ).first().get( 'text' ) }</h1>
				{ note.get( 'body' ).map( ( block, key ) => (
					<p>{ block.get( 'text' ) }</p>
				) ) }
			</div>
		);
	}
} );

export default NoteView;
