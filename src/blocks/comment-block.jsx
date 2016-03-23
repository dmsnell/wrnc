import React from 'react';

require( './comment-block.scss' );

export const CommentBlock = ( { children, CommentId, siteId } ) =>
	<span className="text-range comment">{ children }</span>;

export default CommentBlock;
