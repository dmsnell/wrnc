import React from 'react';

import parseBlocks, { addKey } from 'blocks/block-tree-parser';

require( 'note-view.scss' );

const NoteView = React.createClass( {
	render() {
		const {
			note
		} = this.props;

		const header = parseBlocks( note.get( 'header' ).toJS() );
		const headerExcerpt = note.getIn( [ 'headerExcerpt', 'text' ] );
		const subject = parseBlocks( note.get( 'subject' ).toJS() );
		const subjectExcerpt = note.getIn( [ 'subjectExcerpt', 'text' ] );
		const body = note.get( 'body' ).toJS().map( parseBlocks );

		return (
			<div className="note-view">
				<div className="header">{ header }</div>
				{ headerExcerpt &&
					<div className="header excerpt">{ headerExcerpt }</div> }
				<div className="subject">{ subject }</div>
				{ subjectExcerpt &&
					<div className="subject excerpt">{ subjectExcerpt }</div> }
				<div>
					{ body.map( addKey ) }
				</div>
			</div>
		);
	}
} );

export default NoteView;
