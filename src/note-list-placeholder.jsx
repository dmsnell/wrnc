import React from 'react';

require( 'list-view-placeholder.scss' );

const NoteListPlaceholder = () =>
	<div className="note-list-placeholder">
		<div className="avatar"></div>
		<div>
			<div className="subject"></div>
			<div className="excerpt"></div>
		</div>
	</div>;

NoteListPlaceholder.displayName = 'NoteListPlaceholder';

export default NoteListPlaceholder;
