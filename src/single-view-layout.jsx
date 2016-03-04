import React from 'react';

import NoteView from 'note-view';

const propEquals = ( prop, value ) => a => a.get( prop ) === value;

const SingleViewLayout = React.createClass( {
	render() {
		const {
			notes,
			selectedNote,
			unselectNote
		} = this.props;
		
		return (
			<div>
				<button onClick={ unselectNote }>Back</button>
				<NoteView note={ notes.find( propEquals( 'id', selectedNote ) ) } />
			</div>
		);
	}
} );

export default SingleViewLayout;
