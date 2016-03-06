import React from 'react';

import NoteView from 'note-view';

require( 'single-view-layout.scss' );

const SingleViewLayout = React.createClass( {
	render() {
		const {
			note,
			unselectNote
		} = this.props;

		return (
			<div className="single-view-layout">
				<a className="back-link" onClick={ unselectNote }>Back</a>
				<NoteView { ...{ note } } />
			</div>
		);
	}
} );

export default SingleViewLayout;
