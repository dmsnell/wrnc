import React from 'react';

import NoteView from 'note-view';

const propEquals = ( prop, value ) => a => a.get( prop ) === value;

require( 'single-view-layout.scss' );

const SingleViewLayout = React.createClass( {
	render() {
		const {
			notes,
			selectedNote,
			unselectNote
		} = this.props;
		
		return (
			<div className="single-view-layout">
				<a className="back-link" onClick={ unselectNote }>Back</a>
				<NoteView note={ notes.find( propEquals( 'id', selectedNote ) ) } />
			</div>
		);
	}
} );

export default SingleViewLayout;
