import React from 'react';

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;
		
		return (
			<div>
				<h1>{ note.getIn( [ 'subject', 'text' ] ) }</h1>
				{ note.has( 'subjectExcerpt' ) &&
					<h2>{ note.getIn( [ 'subjectExcerpt', 'text' ] ) }</h2> }
				{ note.get( 'body' ).map( ( block, key ) => (
					<p {...{ key } }>{ block.get( 'text' ) }</p>
				) ) }
			</div>
		);
	}
} );

export default NoteView;
